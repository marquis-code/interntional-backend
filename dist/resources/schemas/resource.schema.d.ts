import { Document } from 'mongoose';
export type ResourceDocument = Resource & Document;
export declare class Resource {
    title: string;
    description: string;
    category: string;
    type: string;
    fileUrl: string;
    uploadedBy: string;
}
export declare const ResourceSchema: import("mongoose").Schema<Resource, import("mongoose").Model<Resource, any, any, any, any, any, Resource>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Resource, Document<unknown, {}, Resource, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Resource, Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Resource, Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Resource, Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Resource, Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileUrl?: import("mongoose").SchemaDefinitionProperty<string, Resource, Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    uploadedBy?: import("mongoose").SchemaDefinitionProperty<string, Resource, Document<unknown, {}, Resource, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Resource & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Resource>;
