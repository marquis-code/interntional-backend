import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MentorshipService } from './mentorship.service';
import { MentorshipController } from './mentorship.controller';
import { Mentorship, MentorshipSchema } from './schemas/mentorship.schema';
import { Mentor, MentorSchema } from './schemas/mentor.schema';
import { MentorCategory, MentorCategorySchema } from './schemas/mentor-category.schema';
import { EmailService } from '../utils/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mentorship.name, schema: MentorshipSchema },
      { name: Mentor.name, schema: MentorSchema },
      { name: MentorCategory.name, schema: MentorCategorySchema }
    ])
  ],
  controllers: [MentorshipController],
  providers: [MentorshipService, EmailService],
})
export class MentorshipModule {}
