import { EnquiriesService } from './enquiries.service';
import type { PaginationParams } from '../utils/pagination.util';
export declare class EnquiriesController {
    private readonly enquiriesService;
    constructor(enquiriesService: EnquiriesService);
    create(createDto: {
        name: string;
        email: string;
        message: string;
    }): Promise<import("mongoose").Document<unknown, {}, import("./enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("./enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(query: PaginationParams): Promise<import("../utils/pagination.util").PaginatedResult<import("./enquiry.schema").Enquiry>>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("./enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
