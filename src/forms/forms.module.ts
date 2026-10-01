import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { Form, FormSchema, FormSubmission, FormSubmissionSchema } from './forms.schema';
import { UtilsModule } from '../utils/utils.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Form.name, schema: FormSchema },
      { name: FormSubmission.name, schema: FormSubmissionSchema },
    ]),
    UtilsModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
