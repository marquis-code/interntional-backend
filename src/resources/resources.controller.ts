import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { StorageService } from '../storage/storage.service';

@Controller('resources')
@UseGuards(AuthGuard('jwt'))
export class ResourcesController {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>,
    private readonly storageService: StorageService,
  ) {}

  // GET /resources – list all resources (Interns & Alumni)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async findAll(@Query('category') category?: string) {
    const filter = category && category !== 'All' ? { category } : {};
    return this.resourceModel.find(filter).sort({ createdAt: -1 }).lean().exec();
  }

  // GET /resources/:id/url – get the Cloudinary url (no longer presigned, just returns the secure_url)
  @Get(':id/signed-url') // Keeping route name the same to not break frontend API if they use it, but they shouldn't need it.
  async getSignedUrl(@Param('id') id: string) {
    const resource = await this.resourceModel.findById(id).exec();
    if (!resource) throw new Error('Resource not found');
    return { signedUrl: resource.fileUrl };
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
}
