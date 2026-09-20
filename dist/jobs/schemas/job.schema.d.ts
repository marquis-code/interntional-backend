import { Document } from 'mongoose';
export type JobDocument = Job & Document;
export declare class Job {
    title: string;
    company: string;
    location: string;
    description: string;
    link: string;
}
export declare const JobSchema: import("mongoose").Schema<Job, import("mongoose").Model<Job, any, any, any, any, any, Job>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Job, Document<unknown, {}, Job, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Job & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Job, Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    company?: import("mongoose").SchemaDefinitionProperty<string, Job, Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Job, Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Job, Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    link?: import("mongoose").SchemaDefinitionProperty<string, Job, Document<unknown, {}, Job, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Job & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Job>;
