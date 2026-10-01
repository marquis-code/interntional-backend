import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './marketplace.schema';
import { Purchase, PurchaseDocument } from './purchase.schema';
import { CreateProductDto, PurchaseProductDto } from './dto';
import axios from 'axios';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
  ) {}

  async createProduct(userId: string, dto: CreateProductDto) {
    const product = new this.productModel({
      ...dto,
      creator: new Types.ObjectId(userId),
      isApproved: true, // Auto-approve for now, can be moderated later
    });
    return await product.save();
  }

  async getProducts(environment?: string, category?: string) {
    const filter: any = { isApproved: true };
    if (environment) filter.environment = environment;
    if (category) filter.category = category;
    
    return await this.productModel
      .find(filter)
      .populate('creator', 'firstName lastName profileImage')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getMyProducts(userId: string) {
    return await this.productModel.find({ creator: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).exec();
  }

  async purchaseProduct(userId: string, dto: PurchaseProductDto) {
    const product = await this.productModel.findById(dto.productId);
    if (!product) throw new NotFoundException('Product not found');

    if (product.price > 0) {
      // Verify Paystack reference
      try {
        const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${dto.reference}`, {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          },
        });
        const data = paystackRes.data.data;
        if (data.status !== 'success') {
          throw new BadRequestException('Transaction was not successful');
        }
        if (data.amount < product.price) {
          throw new BadRequestException('Amount paid is less than product price');
        }
      } catch (err) {
        throw new BadRequestException('Failed to verify payment with Paystack');
      }
    }

    // Record purchase
    const purchase = new this.purchaseModel({
      buyer: new Types.ObjectId(userId),
      product: new Types.ObjectId(dto.productId),
      amountPaid: product.price,
      reference: dto.reference || `free_${Date.now()}`,
    });
    await purchase.save();

    // Increment sales count
    product.salesCount += 1;
    await product.save();

    return { message: 'Purchase successful', fileUrl: product.fileUrl };
  }

  async getMyPurchases(userId: string) {
    const purchases = await this.purchaseModel
      .find({ buyer: new Types.ObjectId(userId) })
      .populate('product')
      .sort({ createdAt: -1 })
      .exec();
    
    return purchases.map(p => p.product);
  }

  async downloadProduct(userId: string, productId: string) {
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    // Check if user is the creator
    if (product.creator.toString() === userId) {
      return { fileUrl: product.fileUrl };
    }

    // Check if user bought it
    const purchase = await this.purchaseModel.findOne({
      buyer: new Types.ObjectId(userId),
      product: new Types.ObjectId(productId),
    });

    if (!purchase && product.price > 0) {
      throw new BadRequestException('You have not purchased this product');
    }

    return { fileUrl: product.fileUrl };
  }
}
