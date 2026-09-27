import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment, PaymentSchema } from './payment.schema';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { UsersModule } from '../users/users.module';
import { UtilsModule } from '../utils/utils.module';

import { PaymentsCronService } from './payments.cron';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: User.name, schema: UserSchema }
    ]),
    SubscriptionsModule,
    UsersModule,
    UtilsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsCronService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
