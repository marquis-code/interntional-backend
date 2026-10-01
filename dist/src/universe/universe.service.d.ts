import { Model } from 'mongoose';
import { University, UniversityDocument, Programme, ProgrammeDocument, Student, StudentDocument } from './universe.schema';
export declare class UniverseService {
    private universityModel;
    private programmeModel;
    private studentModel;
    constructor(universityModel: Model<UniversityDocument>, programmeModel: Model<ProgrammeDocument>, studentModel: Model<StudentDocument>);
    getUniversities(): Promise<(import("mongoose").Document<unknown, {}, UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createUniversity(data: any): Promise<import("mongoose").Document<unknown, {}, UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateUniversity(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteUniversity(id: string): Promise<(import("mongoose").Document<unknown, {}, UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getProgrammes(): Promise<(import("mongoose").Document<unknown, {}, ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createProgramme(data: any): Promise<import("mongoose").Document<unknown, {}, ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProgramme(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteProgramme(id: string): Promise<(import("mongoose").Document<unknown, {}, ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getStudents(): Promise<(import("mongoose").Document<unknown, {}, StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createStudent(data: any): Promise<import("mongoose").Document<unknown, {}, StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStudent(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteStudent(id: string): Promise<(import("mongoose").Document<unknown, {}, StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
