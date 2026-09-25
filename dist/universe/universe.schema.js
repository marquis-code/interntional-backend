"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = exports.Student = exports.ProgrammeSchema = exports.Programme = exports.UniversitySchema = exports.University = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let University = class University {
    name;
    location;
    status;
};
exports.University = University;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], University.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], University.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active' }),
    __metadata("design:type", String)
], University.prototype, "status", void 0);
exports.University = University = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], University);
exports.UniversitySchema = mongoose_1.SchemaFactory.createForClass(University);
let Programme = class Programme {
    name;
    department;
    universityId;
    status;
};
exports.Programme = Programme;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Programme.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Programme.prototype, "department", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'University' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Programme.prototype, "universityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active' }),
    __metadata("design:type", String)
], Programme.prototype, "status", void 0);
exports.Programme = Programme = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Programme);
exports.ProgrammeSchema = mongoose_1.SchemaFactory.createForClass(Programme);
let Student = class Student {
    firstName;
    lastName;
    email;
    universityId;
    programmeId;
    status;
};
exports.Student = Student;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Student.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Student.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'University' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "universityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Programme' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Student.prototype, "programmeId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'enrolled' }),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
exports.Student = Student = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Student);
exports.StudentSchema = mongoose_1.SchemaFactory.createForClass(Student);
//# sourceMappingURL=universe.schema.js.map