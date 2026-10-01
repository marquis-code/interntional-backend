"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorshipModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mentorship_service_1 = require("./mentorship.service");
const mentorship_controller_1 = require("./mentorship.controller");
const mentorship_schema_1 = require("./schemas/mentorship.schema");
const mentor_schema_1 = require("./schemas/mentor.schema");
const mentor_category_schema_1 = require("./schemas/mentor-category.schema");
const email_service_1 = require("../utils/email.service");
let MentorshipModule = class MentorshipModule {
};
exports.MentorshipModule = MentorshipModule;
exports.MentorshipModule = MentorshipModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: mentorship_schema_1.Mentorship.name, schema: mentorship_schema_1.MentorshipSchema },
                { name: mentor_schema_1.Mentor.name, schema: mentor_schema_1.MentorSchema },
                { name: mentor_category_schema_1.MentorCategory.name, schema: mentor_category_schema_1.MentorCategorySchema }
            ])
        ],
        controllers: [mentorship_controller_1.MentorshipController],
        providers: [mentorship_service_1.MentorshipService, email_service_1.EmailService],
    })
], MentorshipModule);
//# sourceMappingURL=mentorship.module.js.map