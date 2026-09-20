import { Document } from 'mongoose';
export declare class Enquiry extends Document {
    name: string;
    email: string;
    message: string;
    status: string;
}
export declare const EnquirySchema: import("mongoose").Schema<Enquiry, import("mongoose").Model<Enquiry, any, any, any, any, any, Enquiry>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Enquiry, Document<unknown, {}, Enquiry, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Enquiry, Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, Enquiry, Document<unknown, {}, Enquiry, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Enquiry & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Enquiry>;
