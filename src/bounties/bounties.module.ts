import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BountiesService } from './bounties.service';
import { BountiesController } from './bounties.controller';
import { Bounty, BountySchema } from './bounty.schema';
import { BountyBooking, BountyBookingSchema } from './bounty-booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bounty.name, schema: BountySchema },
      { name: BountyBooking.name, schema: BountyBookingSchema },
    ]),
  ],
  controllers: [BountiesController],
  providers: [BountiesService],
})
export class BountiesModule {}
