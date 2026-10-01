import { Document, Types } from 'mongoose';
export type PurchaseDocument = Purchase & Document;
export declare class Purchase {
    buyer: Types.ObjectId;
    product: Types.ObjectId;
    amountPaid: number;
    reference: string;
}
export declare const PurchaseSchema: import("mongoose").Schema<Purchase, import("mongoose").Model<Purchase, any, any, any, any, any, Purchase>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Purchase, Document<unknown, {}, Purchase, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Purchase & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    buyer?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Purchase, Document<unknown, {}, Purchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Purchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    product?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Purchase, Document<unknown, {}, Purchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Purchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amountPaid?: import("mongoose").SchemaDefinitionProperty<number, Purchase, Document<unknown, {}, Purchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Purchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reference?: import("mongoose").SchemaDefinitionProperty<string, Purchase, Document<unknown, {}, Purchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Purchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Purchase>;
