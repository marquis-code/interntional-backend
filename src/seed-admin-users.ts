import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole, UserStatus, Department } from './users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

const ADMIN_USERS = [
  {
    firstName: 'InternTional',
    lastName: 'Admin',
    email: 'interntional@medlabconvo.com',
    tempPassword: 'Admin@MLS2026!',
  },
  {
    firstName: 'Universe',
    lastName: 'Admin',
    email: 'universe@medlabconvo.com',
    tempPassword: 'Univ@MLS2026!',
  },
  {
    firstName: 'Marquis',
    lastName: 'Admin',
    email: 'marquis@medlabconvo.com',
    tempPassword: 'Marquis@MLS2026!',
  },
  {
    firstName: 'Oluwamuyiwa',
    lastName: 'Admin',
    email: 'oluwamuyiwa@medlabconvo.com',
    tempPassword: 'Oluwamuyiwa@MLS2026!',
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  try {
    for (const admin of ADMIN_USERS) {
      const existing = await userModel.findOne({ email: admin.email });
      const passwordHash = await bcrypt.hash(admin.tempPassword, 10);

      if (existing) {
        await userModel.findByIdAndUpdate(existing._id, {
          role: UserRole.SUPER_ADMIN,
          status: UserStatus.APPROVED,
          passwordHash,
          firstName: admin.firstName,
          lastName: admin.lastName,
        });
        console.log(`Updated admin: ${admin.email} | Password: ${admin.tempPassword}`);
      } else {
        await userModel.create({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          passwordHash,
          role: UserRole.SUPER_ADMIN,
          status: UserStatus.APPROVED,
          department: Department.GENERAL,
          verificationFileUrl: 'https://example.com/admin.pdf',
          country: 'Nigeria',
          phoneNumber: '+2340000000000',
          professionalBackground: 'Administrator',
        });
        console.log(`Created admin: ${admin.email} | Password: ${admin.tempPassword}`);
      }
    }

    console.log('\n✅ Admin users seeded successfully!');
    console.log('\n=== ADMIN CREDENTIALS ===');
    ADMIN_USERS.forEach(u => {
      console.log(`Email: ${u.email} | Password: ${u.tempPassword}`);
    });
  } catch (error) {
    console.error('Error seeding admin users:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
