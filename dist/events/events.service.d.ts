import { Model } from 'mongoose';
import { Event, EventDocument, EventRegistration, EventRegistrationDocument } from './events.schema';
export declare class EventsService {
    private eventModel;
    private registrationModel;
    constructor(eventModel: Model<EventDocument>, registrationModel: Model<EventRegistrationDocument>);
    getEvents(): Promise<(import("mongoose").Document<unknown, {}, EventDocument, {}, import("mongoose").DefaultSchemaOptions> & Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getEvent(id: string): Promise<(import("mongoose").Document<unknown, {}, EventDocument, {}, import("mongoose").DefaultSchemaOptions> & Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createEvent(data: any): Promise<import("mongoose").Document<unknown, {}, EventDocument, {}, import("mongoose").DefaultSchemaOptions> & Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateEvent(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, EventDocument, {}, import("mongoose").DefaultSchemaOptions> & Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteEvent(id: string): Promise<(import("mongoose").Document<unknown, {}, EventDocument, {}, import("mongoose").DefaultSchemaOptions> & Event & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    registerForEvent(eventId: string, data: any): Promise<import("mongoose").Document<unknown, {}, EventRegistrationDocument, {}, import("mongoose").DefaultSchemaOptions> & EventRegistration & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getRegistrations(eventId: string): Promise<(import("mongoose").Document<unknown, {}, EventRegistrationDocument, {}, import("mongoose").DefaultSchemaOptions> & EventRegistration & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getRegistrationCount(eventId: string): Promise<number>;
    getRegistrationCounts(): Promise<any[]>;
    deleteRegistration(id: string): Promise<(import("mongoose").Document<unknown, {}, EventRegistrationDocument, {}, import("mongoose").DefaultSchemaOptions> & EventRegistration & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
