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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniverseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const universe_schema_1 = require("./universe.schema");
let UniverseService = class UniverseService {
    universityModel;
    programmeModel;
    studentModel;
    constructor(universityModel, programmeModel, studentModel) {
        this.universityModel = universityModel;
        this.programmeModel = programmeModel;
        this.studentModel = studentModel;
    }
    async getUniversities() { return this.universityModel.find().exec(); }
    async createUniversity(data) { return this.universityModel.create(data); }
    async updateUniversity(id, data) { return this.universityModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
    async deleteUniversity(id) { return this.universityModel.findByIdAndDelete(id).exec(); }
    async getProgrammes() { return this.programmeModel.find().populate('universityId').exec(); }
    async createProgramme(data) { return this.programmeModel.create(data); }
    async updateProgramme(id, data) { return this.programmeModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
    async deleteProgramme(id) { return this.programmeModel.findByIdAndDelete(id).exec(); }
    async getStudents() { return this.studentModel.find().populate('universityId').populate('programmeId').exec(); }
    async createStudent(data) { return this.studentModel.create(data); }
    async updateStudent(id, data) { return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
    async deleteStudent(id) { return this.studentModel.findByIdAndDelete(id).exec(); }
};
exports.UniverseService = UniverseService;
exports.UniverseService = UniverseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(universe_schema_1.University.name)),
    __param(1, (0, mongoose_1.InjectModel)(universe_schema_1.Programme.name)),
    __param(2, (0, mongoose_1.InjectModel)(universe_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UniverseService);
//# sourceMappingURL=universe.service.js.map