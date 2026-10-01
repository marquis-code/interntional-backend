import { Document } from 'mongoose';
export type CustomRoleDocument = CustomRole & Document;
export declare class CustomRole {
    name: string;
    permissions: string[];
}
export declare const CustomRoleSchema: import("mongoose").Schema<CustomRole, import("mongoose").Model<CustomRole, any, any, any, any, any, CustomRole>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CustomRole, Document<unknown, {}, CustomRole, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<CustomRole & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, CustomRole, Document<unknown, {}, CustomRole, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CustomRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    permissions?: import("mongoose").SchemaDefinitionProperty<string[], CustomRole, Document<unknown, {}, CustomRole, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<CustomRole & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, CustomRole>;
