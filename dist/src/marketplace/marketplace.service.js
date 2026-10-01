"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const marketplace_schema_1 = require("./marketplace.schema");
const purchase_schema_1 = require("./purchase.schema");
const axios_1 = __importDefault(require("axios"));
let MarketplaceService = class MarketplaceService {
    productModel;
    purchaseModel;
    constructor(productModel, purchaseModel) {
        this.productModel = productModel;
        this.purchaseModel = purchaseModel;
    }
    async createProduct(userId, dto) {
        const product = new this.productModel({
            ...dto,
            creator: new mongoose_2.Types.ObjectId(userId),
            isApproved: true,
        });
        return await product.save();
    }
    async getProducts(environment, category) {
        const filter = { isApproved: true };
        if (environment)
            filter.environment = environment;
        if (category)
            filter.category = category;
        return await this.productModel
            .find(filter)
            .populate('creator', 'firstName lastName profileImage')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getMyProducts(userId) {
        return await this.productModel.find({ creator: new mongoose_2.Types.ObjectId(userId) }).sort({ createdAt: -1 }).exec();
    }
    async purchaseProduct(userId, dto) {
        const product = await this.productModel.findById(dto.productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.price > 0) {
            try {
                const paystackRes = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${dto.reference}`, {
                    headers: {
                        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                    },
                });
                const data = paystackRes.data.data;
                if (data.status !== 'success') {
                    throw new common_1.BadRequestException('Transaction was not successful');
                }
                if (data.amount < product.price) {
                    throw new common_1.BadRequestException('Amount paid is less than product price');
                }
            }
            catch (err) {
                throw new common_1.BadRequestException('Failed to verify payment with Paystack');
            }
        }
        const purchase = new this.purchaseModel({
            buyer: new mongoose_2.Types.ObjectId(userId),
            product: new mongoose_2.Types.ObjectId(dto.productId),
            amountPaid: product.price,
            reference: dto.reference || `free_${Date.now()}`,
        });
        await purchase.save();
        product.salesCount += 1;
        await product.save();
        return { message: 'Purchase successful', fileUrl: product.fileUrl };
    }
    async getMyPurchases(userId) {
        const purchases = await this.purchaseModel
            .find({ buyer: new mongoose_2.Types.ObjectId(userId) })
            .populate('product')
            .sort({ createdAt: -1 })
            .exec();
        return purchases.map(p => p.product);
    }
    async downloadProduct(userId, productId) {
        const product = await this.productModel.findById(productId);
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        if (product.creator.toString() === userId) {
            return { fileUrl: product.fileUrl };
        }
        const purchase = await this.purchaseModel.findOne({
            buyer: new mongoose_2.Types.ObjectId(userId),
            product: new mongoose_2.Types.ObjectId(productId),
        });
        if (!purchase && product.price > 0) {
            throw new common_1.BadRequestException('You have not purchased this product');
        }
        return { fileUrl: product.fileUrl };
    }
};
exports.MarketplaceService = MarketplaceService;
exports.MarketplaceService = MarketplaceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(marketplace_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(purchase_schema_1.Purchase.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MarketplaceService);
//# sourceMappingURL=marketplace.service.js.map