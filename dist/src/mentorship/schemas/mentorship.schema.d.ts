import { Document, Schema as MongooseSchema } from 'mongoose';
export declare class Mentorship extends Document {
    user: MongooseSchema.Types.ObjectId;
    name: string;
    email: string;
    areaOfInterest: string;
    application: string;
    status: string;
    matchedMentor: MongooseSchema.Types.ObjectId;
    notes: string;
}
export declare const MentorshipSchema: MongooseSchema<Mentorship, import("mongoose").Model<Mentorship, any, any, any, any, any, Mentorship>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Mentorship, Document<unknown, {}, Mentorship, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    user?: import("mongoose").SchemaDefinitionProperty<MongooseSchema.Types.ObjectId, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    application?: import("mongoose").SchemaDefinitionProperty<string, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    areaOfInterest?: import("mongoose").SchemaDefinitionProperty<string, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    matchedMentor?: import("mongoose").SchemaDefinitionProperty<MongooseSchema.Types.ObjectId, Mentorship, Document<unknown, {}, Mentorship, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Mentorship>;
