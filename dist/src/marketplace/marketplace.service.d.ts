import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './marketplace.schema';
import { PurchaseDocument } from './purchase.schema';
import { CreateProductDto, PurchaseProductDto } from './dto';
export declare class MarketplaceService {
    private productModel;
    private purchaseModel;
    constructor(productModel: Model<ProductDocument>, purchaseModel: Model<PurchaseDocument>);
    createProduct(userId: string, dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getProducts(environment?: string, category?: string): Promise<(import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyProducts(userId: string): Promise<(import("mongoose").Document<unknown, {}, ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & Product & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    purchaseProduct(userId: string, dto: PurchaseProductDto): Promise<{
        message: string;
        fileUrl: string;
    }>;
    getMyPurchases(userId: string): Promise<Types.ObjectId[]>;
    downloadProduct(userId: string, productId: string): Promise<{
        fileUrl: string;
    }>;
}
