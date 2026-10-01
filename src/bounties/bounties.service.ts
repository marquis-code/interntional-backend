import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bounty, BountyDocument } from './bounty.schema';
import { BountyBooking, BountyBookingDocument } from './bounty-booking.schema';
import { CreateBountyDto, BookBountyDto } from './dto';
import axios from 'axios';

@Injectable()
export class BountiesService {
  constructor(
    @InjectModel(Bounty.name) private bountyModel: Model<BountyDocument>,
    @InjectModel(BountyBooking.name) private bookingModel: Model<BountyBookingDocument>,
  ) {}

  async createBounty(userId: string, dto: CreateBountyDto) {
    const bounty = new this.bountyModel({
      ...dto,
      provider: new Types.ObjectId(userId),
    });
    return await bounty.save();
  }

  async getBounties(environment?: string, category?: string) {
    const filter: any = { isActive: true };
    if (environment) filter.environment = environment;
    if (category) filter.category = category;
    
    return await this.bountyModel
      .find(filter)
      .populate('provider', 'firstName lastName profileImage')
      .sort({ createdAt: -1 })
      .exec();
  }

  async bookBounty(userId: string, dto: BookBountyDto) {
    const bounty = await this.bountyModel.findById(dto.bountyId);
    if (!bounty) throw new NotFoundException('Bounty not found');

    if (bounty.price > 0) {
      try {
        const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${dto.reference}`, {
          headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
        });
        const data = paystackRes.data.data;
        if (data.status !== 'success') throw new BadRequestException('Transaction was not successful');
        if (data.amount < bounty.price) throw new BadRequestException('Amount paid is less than bounty price');
      } catch (err) {
        throw new BadRequestException('Failed to verify payment with Paystack');
      }
    }

    const booking = new this.bookingModel({
      client: new Types.ObjectId(userId),
      bounty: new Types.ObjectId(dto.bountyId),
      amountPaid: bounty.price,
      reference: dto.reference || `free_booking_${Date.now()}`,
      clientNotes: dto.clientNotes || '',
    });
    await booking.save();

    bounty.bookingsCount += 1;
    await bounty.save();

    return { message: 'Bounty booked successfully', bookingId: booking._id };
  }

  async getMyBookings(userId: string) {
    return await this.bookingModel
      .find({ client: new Types.ObjectId(userId) })
      .populate({
        path: 'bounty',
        populate: { path: 'provider', select: 'firstName lastName email' }
      })
      .sort({ createdAt: -1 })
      .exec();
  }
}
