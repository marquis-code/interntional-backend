import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { StorageModule } from './storage/storage.module';
import { JobsModule } from './jobs/jobs.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UniverseModule } from './universe/universe.module';
import { EventsModule } from './events/events.module';
import { ArticlesModule } from './articles/articles.module';
import { FormsModule } from './forms/forms.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/intern_platform'),
    CacheModule.register({
      ttl: 60, // Default 60 seconds
      max: 100, // Maximum number of items in cache
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    ResourcesModule,
    StorageModule,
    JobsModule,
    EnquiriesModule,
    SubscriptionsModule,
    PaymentsModule,
    AnalyticsModule,
    UniverseModule,
    EventsModule,
    ArticlesModule,
    FormsModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
