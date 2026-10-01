import { Document } from 'mongoose';
export declare class MentorCategory extends Document {
    name: string;
}
export declare const MentorCategorySchema: import("mongoose").Schema<MentorCategory, import("mongoose").Model<MentorCategory, any, any, any, any, any, MentorCategory>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MentorCategory, Document<unknown, {}, MentorCategory, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<MentorCategory & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, MentorCategory, Document<unknown, {}, MentorCategory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, MentorCategory, Document<unknown, {}, MentorCategory, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, MentorCategory>;
