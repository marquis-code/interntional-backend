"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BountiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bounty_schema_1 = require("./bounty.schema");
const bounty_booking_schema_1 = require("./bounty-booking.schema");
const axios_1 = __importDefault(require("axios"));
let BountiesService = class BountiesService {
    bountyModel;
    bookingModel;
    constructor(bountyModel, bookingModel) {
        this.bountyModel = bountyModel;
        this.bookingModel = bookingModel;
    }
    async createBounty(userId, dto) {
        const bounty = new this.bountyModel({
            ...dto,
            provider: new mongoose_2.Types.ObjectId(userId),
        });
        return await bounty.save();
    }
    async getBounties(environment, category) {
        const filter = { isActive: true };
        if (environment)
            filter.environment = environment;
        if (category)
            filter.category = category;
        return await this.bountyModel
            .find(filter)
            .populate('provider', 'firstName lastName profileImage')
            .sort({ createdAt: -1 })
            .exec();
    }
    async bookBounty(userId, dto) {
        const bounty = await this.bountyModel.findById(dto.bountyId);
        if (!bounty)
            throw new common_1.NotFoundException('Bounty not found');
        if (bounty.price > 0) {
            try {
                const paystackRes = await axios_1.default.get(`https://api.paystack.co/transaction/verify/${dto.reference}`, {
                    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
                });
                const data = paystackRes.data.data;
                if (data.status !== 'success')
                    throw new common_1.BadRequestException('Transaction was not successful');
                if (data.amount < bounty.price)
                    throw new common_1.BadRequestException('Amount paid is less than bounty price');
            }
            catch (err) {
                throw new common_1.BadRequestException('Failed to verify payment with Paystack');
            }
        }
        const booking = new this.bookingModel({
            client: new mongoose_2.Types.ObjectId(userId),
            bounty: new mongoose_2.Types.ObjectId(dto.bountyId),
            amountPaid: bounty.price,
            reference: dto.reference || `free_booking_${Date.now()}`,
            clientNotes: dto.clientNotes || '',
        });
        await booking.save();
        bounty.bookingsCount += 1;
        await bounty.save();
        return { message: 'Bounty booked successfully', bookingId: booking._id };
    }
    async getMyBookings(userId) {
        return await this.bookingModel
            .find({ client: new mongoose_2.Types.ObjectId(userId) })
            .populate({
            path: 'bounty',
            populate: { path: 'provider', select: 'firstName lastName email' }
        })
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.BountiesService = BountiesService;
exports.BountiesService = BountiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bounty_schema_1.Bounty.name)),
    __param(1, (0, mongoose_1.InjectModel)(bounty_booking_schema_1.BountyBooking.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BountiesService);
//# sourceMappingURL=bounties.service.js.map