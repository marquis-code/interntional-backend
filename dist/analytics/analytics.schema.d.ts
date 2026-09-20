import { Document, Types } from 'mongoose';
export type AnalyticsEventDocument = AnalyticsEvent & Document;
export declare enum EventType {
    PAGE_VIEW = "page_view",
    LOGIN = "login",
    DOWNLOAD = "download",
    JOB_CLICK = "job_click",
    ENQUIRY_SUBMIT = "enquiry_submit",
    SIGNUP = "signup",
    PAYMENT_INIT = "payment_init",
    PAYMENT_SUCCESS = "payment_success",
    DOCUMENT_UPLOAD = "document_upload",
    VAULT_ACCESS = "vault_access",
    MENTOR_CONNECT = "mentor_connect"
}
export declare class AnalyticsEvent {
    event: EventType;
    userId: Types.ObjectId;
    page: string;
    metadata: Record<string, any>;
    ipAddress: string;
    userAgent: string;
    department: string;
}
export declare const AnalyticsEventSchema: import("mongoose").Schema<AnalyticsEvent, import("mongoose").Model<AnalyticsEvent, any, any, any, any, any, AnalyticsEvent>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    event?: import("mongoose").SchemaDefinitionProperty<EventType, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    page?: import("mongoose").SchemaDefinitionProperty<string, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    metadata?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    ipAddress?: import("mongoose").SchemaDefinitionProperty<string, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userAgent?: import("mongoose").SchemaDefinitionProperty<string, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string, AnalyticsEvent, Document<unknown, {}, AnalyticsEvent, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AnalyticsEvent & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, AnalyticsEvent>;
