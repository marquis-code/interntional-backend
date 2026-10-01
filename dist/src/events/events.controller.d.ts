import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    getEvents(): Promise<(import("mongoose").Document<unknown, {}, import("./events.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getEvent(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./events.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createEvent(data: any): Promise<import("mongoose").Document<unknown, {}, import("./events.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateEvent(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./events.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteEvent(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./events.schema").EventDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    registerForEvent(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("./events.schema").EventRegistrationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").EventRegistration & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getRegistrations(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./events.schema").EventRegistrationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").EventRegistration & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getRegistrationCounts(): Promise<any[]>;
    deleteRegistration(regId: string): Promise<(import("mongoose").Document<unknown, {}, import("./events.schema").EventRegistrationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./events.schema").EventRegistration & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
