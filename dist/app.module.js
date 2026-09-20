"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const resources_module_1 = require("./resources/resources.module");
const storage_module_1 = require("./storage/storage.module");
const jobs_module_1 = require("./jobs/jobs.module");
const enquiries_module_1 = require("./enquiries/enquiries.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
const payments_module_1 = require("./payments/payments.module");
const analytics_module_1 = require("./analytics/analytics.module");
const cache_manager_1 = require("@nestjs/cache-manager");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost/intern_platform'),
            cache_manager_1.CacheModule.register({
                ttl: 60,
                max: 100,
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            resources_module_1.ResourcesModule,
            storage_module_1.StorageModule,
            jobs_module_1.JobsModule,
            enquiries_module_1.EnquiriesModule,
            subscriptions_module_1.SubscriptionsModule,
            payments_module_1.PaymentsModule,
            analytics_module_1.AnalyticsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map