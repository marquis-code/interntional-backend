import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MentorshipService } from './mentorship/mentorship.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './users/schemas/user.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<User>>(getModelToken(User.name));
  const mentorshipService = app.get(MentorshipService);

  const emails = ['abahkauzy3@gmail.com', 'ajayiatilola03@gmail.com'];
  
  // Create dummy mentors
  const mentor1 = await mentorshipService.createMentor({
    firstName: 'Robert',
    lastName: 'DeBate',
    email: 'robert@example.com',
    jobTitle: 'Lab Director',
    bio: 'Twenty years managing teams and building quality systems in clinical labs.',
    specializations: ['Lab Management', 'Operations'],
    company: 'Clina Labs'
  });
  
  console.log('Created dummy mentor');

  for (const email of emails) {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log(`User not found: ${email}`);
      continue;
    }

    console.log(`Creating mentorship for: ${email}`);
    
    const request = await mentorshipService.create({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      areaOfInterest: 'Lab Management',
      application: 'universe' // or interntional, backend logic supports querying both
    }, user._id.toString());
    
    // Now artificially mark them as matched with the mentor!
    await mentorshipService.updateStatus(request._id.toString(), {
      status: 'matched',
      matchedMentor: mentor1._id.toString(),
      notes: 'Auto matched via seeder'
    });
    
    console.log(`Successfully seeded matched mentorship for ${email}`);
  }

  await app.close();
}
bootstrap();
