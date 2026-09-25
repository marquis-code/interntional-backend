import { Model } from 'mongoose';
import { Form, FormDocument, FormSubmission, FormSubmissionDocument } from './forms.schema';
export declare class FormsService {
    private formModel;
    private submissionModel;
    constructor(formModel: Model<FormDocument>, submissionModel: Model<FormSubmissionDocument>);
    getForms(): Promise<(import("mongoose").Document<unknown, {}, FormDocument, {}, import("mongoose").DefaultSchemaOptions> & Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getForm(id: string): Promise<(import("mongoose").Document<unknown, {}, FormDocument, {}, import("mongoose").DefaultSchemaOptions> & Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createForm(data: any): Promise<import("mongoose").Document<unknown, {}, FormDocument, {}, import("mongoose").DefaultSchemaOptions> & Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateForm(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, FormDocument, {}, import("mongoose").DefaultSchemaOptions> & Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteForm(id: string): Promise<(import("mongoose").Document<unknown, {}, FormDocument, {}, import("mongoose").DefaultSchemaOptions> & Form & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    submitForm(formId: string, data: any): Promise<import("mongoose").Document<unknown, {}, FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getSubmissions(formId: string): Promise<(import("mongoose").Document<unknown, {}, FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getSubmissionCount(formId: string): Promise<number>;
    getSubmissionCounts(): Promise<any[]>;
    updateSubmission(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteSubmission(id: string): Promise<(import("mongoose").Document<unknown, {}, FormSubmissionDocument, {}, import("mongoose").DefaultSchemaOptions> & FormSubmission & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
