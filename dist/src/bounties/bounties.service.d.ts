import { Model, Types } from 'mongoose';
import { Bounty, BountyDocument } from './bounty.schema';
import { BountyBooking, BountyBookingDocument } from './bounty-booking.schema';
import { CreateBountyDto, BookBountyDto } from './dto';
export declare class BountiesService {
    private bountyModel;
    private bookingModel;
    constructor(bountyModel: Model<BountyDocument>, bookingModel: Model<BountyBookingDocument>);
    createBounty(userId: string, dto: CreateBountyDto): Promise<import("mongoose").Document<unknown, {}, BountyDocument, {}, import("mongoose").DefaultSchemaOptions> & Bounty & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getBounties(environment?: string, category?: string): Promise<(import("mongoose").Document<unknown, {}, BountyDocument, {}, import("mongoose").DefaultSchemaOptions> & Bounty & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    bookBounty(userId: string, dto: BookBountyDto): Promise<{
        message: string;
        bookingId: Types.ObjectId;
    }>;
    getMyBookings(userId: string): Promise<(import("mongoose").Document<unknown, {}, BountyBookingDocument, {}, import("mongoose").DefaultSchemaOptions> & BountyBooking & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
