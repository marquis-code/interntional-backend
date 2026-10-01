import { FormsService } from './forms.service';
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    getForms(): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getForm(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createForm(data: any): Promise<import("mongoose").Document<unknown, {}, import("./forms.schema").FormDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateForm(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteForm(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    submitForm(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("./forms.schema").FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getSubmissions(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSubmissionCounts(): Promise<any[]>;
    updateSubmission(subId: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteSubmission(subId: string): Promise<(import("mongoose").Document<unknown, {}, import("./forms.schema").FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./forms.schema").FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
