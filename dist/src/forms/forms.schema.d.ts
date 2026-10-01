import { Document, Types } from 'mongoose';
export type FormDocument = Form & Document;
export type FormSubmissionDocument = FormSubmission & Document;
export declare class FormField {
    label: string;
    type: string;
    required: boolean;
    placeholder: string;
    options: string[];
    helpText: string;
    order: number;
    maxLength: number;
    accept: string;
    maxFileSize: number;
}
export declare const FormFieldSchema: import("mongoose").Schema<FormField, import("mongoose").Model<FormField, any, any, any, any, any, FormField>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FormField, Document<unknown, {}, FormField, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    label?: import("mongoose").SchemaDefinitionProperty<string, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    required?: import("mongoose").SchemaDefinitionProperty<boolean, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    placeholder?: import("mongoose").SchemaDefinitionProperty<string, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    options?: import("mongoose").SchemaDefinitionProperty<string[], FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    helpText?: import("mongoose").SchemaDefinitionProperty<string, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    order?: import("mongoose").SchemaDefinitionProperty<number, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxLength?: import("mongoose").SchemaDefinitionProperty<number, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    accept?: import("mongoose").SchemaDefinitionProperty<string, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxFileSize?: import("mongoose").SchemaDefinitionProperty<number, FormField, Document<unknown, {}, FormField, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormField & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, FormField>;
export declare class Form {
    title: string;
    description: string;
    type: string;
    fields: FormField[];
    linkedEvent: Types.ObjectId;
    linkedProgramme: Types.ObjectId;
    status: string;
    deadline: Date;
    coverImage: string;
    allowMultipleSubmissions: boolean;
    successMessage: string;
    maxSubmissions: number;
}
export declare const FormSchema: import("mongoose").Schema<Form, import("mongoose").Model<Form, any, any, any, any, any, Form>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Form, Document<unknown, {}, Form, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fields?: import("mongoose").SchemaDefinitionProperty<FormField[], Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    linkedEvent?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    linkedProgramme?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    deadline?: import("mongoose").SchemaDefinitionProperty<Date, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    coverImage?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    allowMultipleSubmissions?: import("mongoose").SchemaDefinitionProperty<boolean, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    successMessage?: import("mongoose").SchemaDefinitionProperty<string, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxSubmissions?: import("mongoose").SchemaDefinitionProperty<number, Form, Document<unknown, {}, Form, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Form & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Form>;
export declare class FormSubmission {
    formId: Types.ObjectId;
    data: Record<string, any>;
    submitterEmail: string;
    submitterName: string;
    status: string;
    reviewNotes: string;
}
export declare const FormSubmissionSchema: import("mongoose").Schema<FormSubmission, import("mongoose").Model<FormSubmission, any, any, any, any, any, FormSubmission>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FormSubmission, Document<unknown, {}, FormSubmission, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    formId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, FormSubmission, Document<unknown, {}, FormSubmission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    data?: import("mongoose").SchemaDefinitionProperty<Record<string, any>, FormSubmission, Document<unknown, {}, FormSubmission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    submitterEmail?: import("mongoose").SchemaDefinitionProperty<string, FormSubmission, Document<unknown, {}, FormSubmission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    submitterName?: import("mongoose").SchemaDefinitionProperty<string, FormSubmission, Document<unknown, {}, FormSubmission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, FormSubmission, Document<unknown, {}, FormSubmission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    reviewNotes?: import("mongoose").SchemaDefinitionProperty<string, FormSubmission, Document<unknown, {}, FormSubmission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FormSubmission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, FormSubmission>;
