import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsEvent, AnalyticsEventSchema } from './analytics.schema';
import { Payment, PaymentSchema } from '../payments/payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsEvent.name, schema: AnalyticsEventSchema },
      { name: Payment.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
