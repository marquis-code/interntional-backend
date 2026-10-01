import { Model, Types } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { ResourcePurchaseDocument } from './schemas/resource-purchase.schema';
import { StorageService } from '../storage/storage.service';
import { PaginationParams } from '../utils/pagination.util';
export declare class ResourcesController {
    private resourceModel;
    private purchaseModel;
    private readonly storageService;
    constructor(resourceModel: Model<ResourceDocument>, purchaseModel: Model<ResourcePurchaseDocument>, storageService: StorageService);
    findAll(queryParams: PaginationParams & {
        category?: string;
    }): Promise<import("../utils/pagination.util").PaginatedResult<ResourceDocument>>;
    getSignedUrl(id: string, req: any): Promise<{
        signedUrl: string;
    }>;
    buyPremiumResource(id: string, body: {
        reference: string;
    }, req: any): Promise<{
        message: string;
        signedUrl: string;
    }>;
    create(body: Partial<Resource>, req: any): Promise<import("mongoose").Document<unknown, {}, ResourceDocument, {}, import("mongoose").DefaultSchemaOptions> & Resource & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    update(id: string, body: {
        title?: string;
        description?: string;
        category?: string;
        type?: string;
        fileUrl?: string;
    }): Promise<import("mongoose").Document<unknown, {}, ResourceDocument, {}, import("mongoose").DefaultSchemaOptions> & Resource & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    partialUpdate(id: string, body: {
        title?: string;
        description?: string;
        category?: string;
        type?: string;
        fileUrl?: string;
    }): Promise<import("mongoose").Document<unknown, {}, ResourceDocument, {}, import("mongoose").DefaultSchemaOptions> & Resource & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
