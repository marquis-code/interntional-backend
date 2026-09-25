import { UniverseService } from './universe.service';
export declare class UniverseController {
    private readonly universeService;
    constructor(universeService: UniverseService);
    getUniversities(): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createUniversity(data: any): Promise<import("mongoose").Document<unknown, {}, import("./universe.schema").UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateUniversity(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteUniversity(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").UniversityDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").University & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getProgrammes(): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createProgramme(data: any): Promise<import("mongoose").Document<unknown, {}, import("./universe.schema").ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateProgramme(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteProgramme(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").ProgrammeDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Programme & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getStudents(): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createStudent(data: any): Promise<import("mongoose").Document<unknown, {}, import("./universe.schema").StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStudent(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteStudent(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./universe.schema").StudentDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./universe.schema").Student & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
