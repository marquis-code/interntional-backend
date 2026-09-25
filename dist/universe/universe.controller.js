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
exports.UniverseController = void 0;
const common_1 = require("@nestjs/common");
const universe_service_1 = require("./universe.service");
let UniverseController = class UniverseController {
    universeService;
    constructor(universeService) {
        this.universeService = universeService;
    }
    getUniversities() { return this.universeService.getUniversities(); }
    createUniversity(data) { return this.universeService.createUniversity(data); }
    updateUniversity(id, data) { return this.universeService.updateUniversity(id, data); }
    deleteUniversity(id) { return this.universeService.deleteUniversity(id); }
    getProgrammes() { return this.universeService.getProgrammes(); }
    createProgramme(data) { return this.universeService.createProgramme(data); }
    updateProgramme(id, data) { return this.universeService.updateProgramme(id, data); }
    deleteProgramme(id) { return this.universeService.deleteProgramme(id); }
    getStudents() { return this.universeService.getStudents(); }
    createStudent(data) { return this.universeService.createStudent(data); }
    updateStudent(id, data) { return this.universeService.updateStudent(id, data); }
    deleteStudent(id) { return this.universeService.deleteStudent(id); }
};
exports.UniverseController = UniverseController;
__decorate([
    (0, common_1.Get)('universities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "getUniversities", null);
__decorate([
    (0, common_1.Post)('universities'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "createUniversity", null);
__decorate([
    (0, common_1.Patch)('universities/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "updateUniversity", null);
__decorate([
    (0, common_1.Delete)('universities/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "deleteUniversity", null);
__decorate([
    (0, common_1.Get)('programmes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "getProgrammes", null);
__decorate([
    (0, common_1.Post)('programmes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "createProgramme", null);
__decorate([
    (0, common_1.Patch)('programmes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "updateProgramme", null);
__decorate([
    (0, common_1.Delete)('programmes/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "deleteProgramme", null);
__decorate([
    (0, common_1.Get)('students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "getStudents", null);
__decorate([
    (0, common_1.Post)('students'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Patch)('students/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)('students/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UniverseController.prototype, "deleteStudent", null);
exports.UniverseController = UniverseController = __decorate([
    (0, common_1.Controller)('universe'),
    __metadata("design:paramtypes", [universe_service_1.UniverseService])
], UniverseController);
//# sourceMappingURL=universe.controller.js.map