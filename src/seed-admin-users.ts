import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole, UserStatus, Department } from './users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

const ALL_PERMISSIONS = [
  'manage_users',
  'approve_documents',
  'manage_subscriptions',
  'manage_payments',
  'manage_content',
  'view_analytics',
  'manage_jobs',
  'manage_enquiries',
  'manage_roles',
  'view_users', 'create_users', 'edit_users', 'delete_users',
  'view_roles', 'create_roles', 'edit_roles', 'delete_roles',
  'view_vault', 'create_vault', 'edit_vault', 'delete_vault',
  'view_jobs', 'create_jobs', 'edit_jobs', 'delete_jobs',
  'view_mentorship', 'create_mentorship', 'edit_mentorship', 'delete_mentorship',
  'view_courses', 'create_courses', 'edit_courses', 'delete_courses',
  'view_marketplace', 'create_marketplace', 'edit_marketplace', 'delete_marketplace',
  'view_bounties', 'create_bounties', 'edit_bounties', 'delete_bounties',
  'view_events', 'create_events', 'edit_events', 'delete_events',
  'view_content', 'create_content', 'edit_content', 'delete_content',
  'view_forms', 'create_forms', 'edit_forms', 'delete_forms',
  'view_enquiries', 'create_enquiries', 'edit_enquiries', 'delete_enquiries',
  'view_subscriptions', 'create_subscriptions', 'edit_subscriptions', 'delete_subscriptions',
  'view_payments', 'create_payments', 'edit_payments', 'delete_payments',
  'view_analytics', 'create_analytics', 'edit_analytics', 'delete_analytics',
];

const ADMIN_USERS = [
  {
    firstName: 'InternTional',
    lastName: 'Admin',
    email: 'interntional@medlabconvo.com',
    role: UserRole.SUPER_ADMIN,
    adminPlatform: 'interntional',
    tempPassword: 'Admin@MLS2026!',
  },
  {
    firstName: 'Universe',
    lastName: 'Admin',
    email: 'universe@medlabconvo.com',
    role: UserRole.SUPER_ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'Univ@MLS2026!',
  },
  {
    firstName: 'Marquis',
    lastName: 'Admin',
    email: 'marquis@medlabconvo.com',
    role: UserRole.SUPER_ADMIN,
    adminPlatform: 'both',
    tempPassword: 'Marquis@MLS2026!',
  },
  {
    firstName: 'Oluwamuyiwa',
    lastName: 'Admin',
    email: 'oluwamuyiwa@medlabconvo.com',
    role: UserRole.SUPER_ADMIN,
    adminPlatform: 'both',
    tempPassword: 'Oluwamuyiwa@MLS2026!',
  },
  // UniVerse Technical Team Members
  {
    firstName: 'Zekeri',
    lastName: 'Suleiman',
    email: 'zekerisuleiman6@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Andy',
    lastName: 'Etinosa',
    email: 'andyetinosa05@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Oge',
    lastName: 'Ibe',
    email: 'oge.ibe55@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Folamide',
    lastName: 'Admin',
    email: 'folamide334@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Miracle',
    lastName: 'Admin',
    email: 'miracle@medlabconvo.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Oyindamola',
    lastName: 'Admin',
    email: 'oyindamola@medlabconvo.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Michael',
    lastName: 'Ezeagu',
    email: 'ezeagumichael290307@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Gospel',
    lastName: 'Aiuagelemon',
    email: 'gospelaiuagelemon@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
  {
    firstName: 'Raphael',
    lastName: 'Ojeka',
    email: 'ojekaraphael6@gmail.com',
    role: UserRole.ADMIN,
    adminPlatform: 'universe',
    tempPassword: 'UniVerse@Tech2026!',
  },
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<User>>(getModelToken(User.name));

  try {
    for (const admin of ADMIN_USERS) {
      const normalizedEmail = admin.email.toLowerCase().trim();
      const existing = await userModel.findOne({ email: normalizedEmail });
      const passwordHash = await bcrypt.hash(admin.tempPassword, 10);

      if (existing) {
        await userModel.findByIdAndUpdate(existing._id, {
          role: admin.role,
          status: UserStatus.APPROVED,
          adminPlatform: admin.adminPlatform,
          permissions: ALL_PERMISSIONS,
          passwordHash,
          firstName: admin.firstName,
          lastName: admin.lastName,
        });
        console.log(`Updated admin: ${normalizedEmail} | Role: ${admin.role} | Platform: ${admin.adminPlatform}`);
      } else {
        await userModel.create({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: normalizedEmail,
          passwordHash,
          role: admin.role,
          status: UserStatus.APPROVED,
          adminPlatform: admin.adminPlatform,
          permissions: ALL_PERMISSIONS,
          department: Department.GENERAL,
          verificationFileUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
          country: 'Nigeria',
          phoneNumber: '+2340000000000',
          professionalBackground: 'Technical Team Administrator',
        });
        console.log(`Created admin: ${normalizedEmail} | Role: ${admin.role} | Platform: ${admin.adminPlatform}`);
      }
    }

    console.log('\n✅ Admin & Technical Team users seeded successfully!');
    console.log('\n=== ADMIN CREDENTIALS ===');
    ADMIN_USERS.forEach(u => {
      console.log(`Email: ${u.email.toLowerCase().trim()} | Role: ${u.role} | Platform: ${u.adminPlatform} | Password: ${u.tempPassword}`);
    });
  } catch (error) {
    console.error('Error seeding admin users:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
