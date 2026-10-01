import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Mentor extends Document {
    name: string;
    email: string;
    avatar: string;
    bio: string;
    areaOfInterest: string;
    isActive: boolean;
}
export declare const MentorSchema: MongooseSchema<Mentor, import("mongoose").Model<Mentor, any, any, any, any, any, Mentor>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Mentor, Document<unknown, {}, Mentor, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    areaOfInterest?: import("mongoose").SchemaDefinitionProperty<string, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    avatar?: import("mongoose").SchemaDefinitionProperty<string, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    bio?: import("mongoose").SchemaDefinitionProperty<string, Mentor, Document<unknown, {}, Mentor, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Mentor>;
