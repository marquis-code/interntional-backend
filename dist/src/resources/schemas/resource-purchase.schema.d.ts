import { Document, Types } from 'mongoose';
export type ResourcePurchaseDocument = ResourcePurchase & Document;
export declare class ResourcePurchase {
    user: Types.ObjectId;
    resource: Types.ObjectId;
    amountPaid: number;
    reference: string;
    status: string;
}
export declare const ResourcePurchaseSchema: import("mongoose").Schema<ResourcePurchase, import("mongoose").Model<ResourcePurchase, any, any, any, any, any, ResourcePurchase>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ResourcePurchase, Document<unknown, {}, ResourcePurchase, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ResourcePurchase & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    user?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ResourcePurchase, Document<unknown, {}, ResourcePurchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ResourcePurchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    resource?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ResourcePurchase, Document<unknown, {}, ResourcePurchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ResourcePurchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    amountPaid?: import("mongoose").SchemaDefinitionProperty<number, ResourcePurchase, Document<unknown, {}, ResourcePurchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ResourcePurchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reference?: import("mongoose").SchemaDefinitionProperty<string, ResourcePurchase, Document<unknown, {}, ResourcePurchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ResourcePurchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, ResourcePurchase, Document<unknown, {}, ResourcePurchase, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ResourcePurchase & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ResourcePurchase>;
