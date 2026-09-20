import { Model } from 'mongoose';
import { Enquiry } from './enquiry.schema';
export declare class EnquiriesService {
    private enquiryModel;
    constructor(enquiryModel: Model<Enquiry>);
    create(createDto: {
        name: string;
        email: string;
        message: string;
    }): Promise<import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    markAsRead(id: string): Promise<(import("mongoose").Document<unknown, {}, Enquiry, {}, import("mongoose").DefaultSchemaOptions> & Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
