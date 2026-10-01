import { Model } from 'mongoose';
import { CreateMentorshipDto, UpdateMentorshipStatusDto } from './dto/create-mentorship.dto';
import { Mentorship } from './schemas/mentorship.schema';
import { Mentor } from './schemas/mentor.schema';
import { MentorCategory } from './schemas/mentor-category.schema';
import type { PaginationParams } from '../utils/pagination.util';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../utils/email.service';
export declare class MentorshipService {
    private mentorshipModel;
    private mentorModel;
    private mentorCategoryModel;
    private readonly notificationsService;
    private readonly emailService;
    constructor(mentorshipModel: Model<Mentorship>, mentorModel: Model<Mentor>, mentorCategoryModel: Model<MentorCategory>, notificationsService: NotificationsService, emailService: EmailService);
    create(createMentorshipDto: CreateMentorshipDto, userId?: string): Promise<import("mongoose").Document<unknown, {}, Mentorship, {}, import("mongoose").DefaultSchemaOptions> & Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findMyStatus(userId: string, application?: string): Promise<{
        status: string;
        request?: undefined;
        mentor?: undefined;
    } | {
        status: string;
        request: import("mongoose").Document<unknown, {}, Mentorship, {}, import("mongoose").DefaultSchemaOptions> & Mentorship & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
        mentor: import("mongoose").Schema.Types.ObjectId;
    }>;
    findAll(params?: PaginationParams, application?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, Mentorship, {}, import("mongoose").DefaultSchemaOptions> & Mentorship & Required<{
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Mentorship, {}, import("mongoose").DefaultSchemaOptions> & Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateStatus(id: string, updateDto: UpdateMentorshipStatusDto): Promise<import("mongoose").Document<unknown, {}, Mentorship, {}, import("mongoose").DefaultSchemaOptions> & Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, Mentorship, {}, import("mongoose").DefaultSchemaOptions> & Mentorship & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createMentor(createMentorDto: any): Promise<import("mongoose").Document<unknown, {}, Mentor, {}, import("mongoose").DefaultSchemaOptions> & Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllMentors(): Promise<(import("mongoose").Document<unknown, {}, Mentor, {}, import("mongoose").DefaultSchemaOptions> & Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    updateMentor(id: string, updateMentorDto: any): Promise<import("mongoose").Document<unknown, {}, Mentor, {}, import("mongoose").DefaultSchemaOptions> & Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    removeMentor(id: string): Promise<import("mongoose").Document<unknown, {}, Mentor, {}, import("mongoose").DefaultSchemaOptions> & Mentor & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    createCategory(createCategoryDto: any): Promise<import("mongoose").Document<unknown, {}, MentorCategory, {}, import("mongoose").DefaultSchemaOptions> & MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAllCategories(): Promise<(import("mongoose").Document<unknown, {}, MentorCategory, {}, import("mongoose").DefaultSchemaOptions> & MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    removeCategory(id: string): Promise<import("mongoose").Document<unknown, {}, MentorCategory, {}, import("mongoose").DefaultSchemaOptions> & MentorCategory & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
