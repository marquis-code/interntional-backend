import { Document } from 'mongoose';
export type ApplicationDocument = Application & Document;
export declare class Application {
    jobId: string;
    jobTitle: string;
    name: string;
    email: string;
    cvUrl: string;
    status: string;
}
export declare const ApplicationSchema: import("mongoose").Schema<Application, import("mongoose").Model<Application, any, any, any, any, any, Application>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Application, Document<unknown, {}, Application, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    jobId?: import("mongoose").SchemaDefinitionProperty<string, Application, Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    jobTitle?: import("mongoose").SchemaDefinitionProperty<string, Application, Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Application, Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Application, Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    cvUrl?: import("mongoose").SchemaDefinitionProperty<string, Application, Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Application, Document<unknown, {}, Application, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Application & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Application>;
