import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { ResourcePurchase, ResourcePurchaseDocument } from './schemas/resource-purchase.schema';
import { StorageService } from '../storage/storage.service';
import { paginateQuery, PaginationParams } from '../utils/pagination.util';
import axios from 'axios';

@Controller('resources')
@UseGuards(AuthGuard('jwt'))
export class ResourcesController {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
    @InjectModel(ResourcePurchase.name) private purchaseModel: Model<ResourcePurchaseDocument>,
    private readonly storageService: StorageService,
  ) {}

  // GET /resources – list all resources (Interns & Alumni)
  @Get()
  async findAll(@Query() queryParams: PaginationParams & { category?: string }) {
    const query: any = {};
    if (queryParams.category && queryParams.category !== 'All') {
      query.category = queryParams.category;
    }
    return paginateQuery(this.resourceModel, query, queryParams, ['title', 'description', 'category', 'fileType']);
  }

  // GET /resources/:id/signed-url – get the Cloudinary url (no longer presigned, just returns the secure_url)
  @Get(':id/signed-url') // Keeping route name the same to not break frontend API if they use it, but they shouldn't need it.
  async getSignedUrl(@Param('id') id: string, @Req() req: any) {
    const resource = await this.resourceModel.findById(id).exec();
    if (!resource) throw new Error('Resource not found');
    
    if (resource.isPremium) {
      const purchase = await this.purchaseModel.findOne({ user: new Types.ObjectId(req.user._id || req.user.userId), resource: new Types.ObjectId(id) });
      if (!purchase) throw new ForbiddenException('You must purchase this premium resource first.');
    }
    
    return { signedUrl: resource.fileUrl };
  }

  @Post(':id/buy')
  async buyPremiumResource(@Param('id') id: string, @Body() body: { reference: string }, @Req() req: any) {
    const resource = await this.resourceModel.findById(id);
    if (!resource) throw new Error('Resource not found');
    if (!resource.isPremium) throw new BadRequestException('This resource is free');

    try {
      const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${body.reference}`, {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      });
      const data = paystackRes.data.data;
      if (data.status !== 'success') throw new BadRequestException('Transaction was not successful');
      if (data.amount < resource.price) throw new BadRequestException('Amount paid is less than price');
    } catch (err) {
      throw new BadRequestException('Failed to verify payment with Paystack');
    }

    const purchase = new this.purchaseModel({
      user: new Types.ObjectId(req.user._id || req.user.userId),
      resource: new Types.ObjectId(id),
      amountPaid: resource.price,
      reference: body.reference,
      status: 'completed'
    });
    await purchase.save();

    return { message: 'Purchase successful', signedUrl: resource.fileUrl };
  }

  // POST /resources – create a new resource (admin only, caller must have SUPER_ADMIN role)
  @Post()
  async create(@Body() body: Partial<Resource>, @Req() req: any) {
    const resource = new this.resourceModel({
      ...body,
      uploadedBy: req.user.userId,
    });
    return resource.save();
  }

  // DELETE /resources/:id – delete a resource
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.resourceModel.findByIdAndDelete(id).exec();
    return { message: 'Resource deleted successfully' };
  }

  // PUT /resources/:id – update a resource
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { title?: string; description?: string; category?: string; type?: string; fileUrl?: string }) {
    const updated = await this.resourceModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).exec();
    if (!updated) throw new Error('Resource not found');
    return updated;
  }

  // PATCH /resources/:id – partial update a resource
  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() body: { title?: string; description?: string; category?: string; type?: string; fileUrl?: string }) {
    const updated = await this.resourceModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    ).exec();
    if (!updated) throw new Error('Resource not found');
    return updated;
  }
}
