import { EnquiriesService } from './enquiries.service';
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
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("./enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./enquiry.schema").Enquiry, {}, import("mongoose").DefaultSchemaOptions> & import("./enquiry.schema").Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
