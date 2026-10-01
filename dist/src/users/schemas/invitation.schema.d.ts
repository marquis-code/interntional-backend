import { Document } from 'mongoose';
export type InvitationDocument = Invitation & Document;
export declare class Invitation {
    email: string;
    token: string;
    role: string;
    adminPlatform: string;
    permissions: string[];
    department?: string;
    expiresAt: Date;
    isUsed: boolean;
}
export declare const InvitationSchema: import("mongoose").Schema<Invitation, import("mongoose").Model<Invitation, any, any, any, any, any, Invitation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Invitation, Document<unknown, {}, Invitation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    email?: import("mongoose").SchemaDefinitionProperty<string, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    token?: import("mongoose").SchemaDefinitionProperty<string, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<string, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    adminPlatform?: import("mongoose").SchemaDefinitionProperty<string, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    permissions?: import("mongoose").SchemaDefinitionProperty<string[], Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string | undefined, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isUsed?: import("mongoose").SchemaDefinitionProperty<boolean, Invitation, Document<unknown, {}, Invitation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Invitation & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Invitation>;
