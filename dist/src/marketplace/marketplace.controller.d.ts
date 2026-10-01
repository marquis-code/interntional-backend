import { MarketplaceService } from './marketplace.service';
import { CreateProductDto, PurchaseProductDto } from './dto';
export declare class MarketplaceController {
    private readonly marketplaceService;
    constructor(marketplaceService: MarketplaceService);
    getProducts(environment?: string, category?: string): Promise<(import("mongoose").Document<unknown, {}, import("./marketplace.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./marketplace.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getMyProducts(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./marketplace.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./marketplace.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createProduct(req: any, dto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("./marketplace.schema").ProductDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./marketplace.schema").Product & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    purchaseProduct(req: any, dto: PurchaseProductDto): Promise<{
        message: string;
        fileUrl: string;
    }>;
    getMyPurchases(req: any): Promise<import("mongoose").Types.ObjectId[]>;
    downloadProduct(req: any, id: string): Promise<{
        fileUrl: string;
    }>;
}
