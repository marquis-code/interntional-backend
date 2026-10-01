import { Document, Types } from 'mongoose';
export type BountyBookingDocument = BountyBooking & Document;
export declare class BountyBooking {
    client: Types.ObjectId;
    bounty: Types.ObjectId;
    amountPaid: number;
    reference: string;
    status: string;
    clientNotes: string;
}
export declare const BountyBookingSchema: import("mongoose").Schema<BountyBooking, import("mongoose").Model<BountyBooking, any, any, any, any, any, BountyBooking>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BountyBooking, Document<unknown, {}, BountyBooking, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    client?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, BountyBooking, Document<unknown, {}, BountyBooking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    bounty?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, BountyBooking, Document<unknown, {}, BountyBooking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amountPaid?: import("mongoose").SchemaDefinitionProperty<number, BountyBooking, Document<unknown, {}, BountyBooking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reference?: import("mongoose").SchemaDefinitionProperty<string, BountyBooking, Document<unknown, {}, BountyBooking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, BountyBooking, Document<unknown, {}, BountyBooking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    clientNotes?: import("mongoose").SchemaDefinitionProperty<string, BountyBooking, Document<unknown, {}, BountyBooking, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<BountyBooking & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, BountyBooking>;
