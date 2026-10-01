import { BountiesService } from './bounties.service';
import { CreateBountyDto, BookBountyDto } from './dto';
export declare class BountiesController {
    private readonly bountiesService;
    constructor(bountiesService: BountiesService);
    getBounties(environment?: string, category?: string): Promise<(import("mongoose").Document<unknown, {}, import("./bounty.schema").BountyDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./bounty.schema").Bounty & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    createBounty(req: any, dto: CreateBountyDto): Promise<import("mongoose").Document<unknown, {}, import("./bounty.schema").BountyDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./bounty.schema").Bounty & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    bookBounty(req: any, dto: BookBountyDto): Promise<{
        message: string;
        bookingId: import("mongoose").Types.ObjectId;
    }>;
    getMyBookings(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./bounty-booking.schema").BountyBookingDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./bounty-booking.schema").BountyBooking & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
}
