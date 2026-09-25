import { Document, Types } from 'mongoose';
export type UniversityDocument = University & Document;
export declare class University {
    name: string;
    location: string;
    status: string;
}
export declare const UniversitySchema: import("mongoose").Schema<University, import("mongoose").Model<University, any, any, any, any, any, University>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, University, Document<unknown, {}, University, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<University & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, University, Document<unknown, {}, University, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<University & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, University, Document<unknown, {}, University, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<University & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, University, Document<unknown, {}, University, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<University & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, University>;
export type ProgrammeDocument = Programme & Document;
export declare class Programme {
    name: string;
    department: string;
    universityId: Types.ObjectId;
    status: string;
}
export declare const ProgrammeSchema: import("mongoose").Schema<Programme, import("mongoose").Model<Programme, any, any, any, any, any, Programme>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Programme, Document<unknown, {}, Programme, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Programme & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Programme, Document<unknown, {}, Programme, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Programme & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    department?: import("mongoose").SchemaDefinitionProperty<string, Programme, Document<unknown, {}, Programme, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Programme & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    universityId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Programme, Document<unknown, {}, Programme, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Programme & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Programme, Document<unknown, {}, Programme, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Programme & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Programme>;
export type StudentDocument = Student & Document;
export declare class Student {
    firstName: string;
    lastName: string;
    email: string;
    universityId: Types.ObjectId;
    programmeId: Types.ObjectId;
    status: string;
}
export declare const StudentSchema: import("mongoose").Schema<Student, import("mongoose").Model<Student, any, any, any, any, any, Student>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Student, Document<unknown, {}, Student, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    firstName?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastName?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    universityId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    programmeId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Student, Document<unknown, {}, Student, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Student & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Student>;
