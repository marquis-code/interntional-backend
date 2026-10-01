import { Document, Types } from 'mongoose';
export type BountyDocument = Bounty & Document;
export declare class Bounty {
    title: string;
    description: string;
    price: number;
    provider: Types.ObjectId;
    category: string;
    environment: string;
    isActive: boolean;
    bookingsCount: number;
}
export declare const BountySchema: import("mongoose").Schema<Bounty, import("mongoose").Model<Bounty, any, any, any, any, any, Bounty>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Bounty, Document<unknown, {}, Bounty, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    price?: import("mongoose").SchemaDefinitionProperty<number, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    provider?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    category?: import("mongoose").SchemaDefinitionProperty<string, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    environment?: import("mongoose").SchemaDefinitionProperty<string, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    bookingsCount?: import("mongoose").SchemaDefinitionProperty<number, Bounty, Document<unknown, {}, Bounty, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Bounty & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Bounty>;
