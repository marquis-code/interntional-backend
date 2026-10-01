import { MentorshipService } from './mentorship.service';
import { CreateMentorshipDto, UpdateMentorshipStatusDto } from './dto/create-mentorship.dto';
export declare class MentorshipController {
    private readonly mentorshipService;
    constructor(mentorshipService: MentorshipService);
    create(createMentorshipDto: CreateMentorshipDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentorship.schema").Mentorship, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentorship.schema").Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findMyStatus(req: any, application?: string): Promise<{
        status: string;
        request?: undefined;
        mentor?: undefined;
    } | {
        status: string;
        request: import("mongoose").Document<unknown, {}, import("./schemas/mentorship.schema").Mentorship, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentorship.schema").Mentorship & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        mentor: import("mongoose").Schema.Types.ObjectId;
    }>;
    findAll(page?: number, limit?: number, application?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/mentorship.schema").Mentorship, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentorship.schema").Mentorship & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentorship.schema").Mentorship, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentorship.schema").Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, updateDto: UpdateMentorshipStatusDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentorship.schema").Mentorship, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentorship.schema").Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentorship.schema").Mentorship, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentorship.schema").Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createMentor(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentor.schema").Mentor, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor.schema").Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllMentors(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/mentor.schema").Mentor, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor.schema").Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateMentor(id: string, body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentor.schema").Mentor, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor.schema").Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    removeMentor(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentor.schema").Mentor, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor.schema").Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createCategory(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentor-category.schema").MentorCategory, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor-category.schema").MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllCategories(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/mentor-category.schema").MentorCategory, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor-category.schema").MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    removeCategory(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/mentor-category.schema").MentorCategory, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/mentor-category.schema").MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
