import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';
import { StorageService } from '../storage/storage.service';
import { PaginationParams } from '../utils/pagination.util';
export declare class ResourcesController {
    private resourceModel;
    private readonly storageService;
    constructor(resourceModel: Model<ResourceDocument>, storageService: StorageService);
    findAll(queryParams: PaginationParams & {
        category?: string;
    }): Promise<import("../utils/pagination.util").PaginatedResult<ResourceDocument>>;
    getSignedUrl(id: string): Promise<{
        signedUrl: string;
    }>;
    create(body: Partial<Resource>, req: any): Promise<import("mongoose").Document<unknown, {}, ResourceDocument, {}, import("mongoose").DefaultSchemaOptions> & Resource & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
