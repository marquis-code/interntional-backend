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
exports.BookBountyDto = exports.CreateBountyDto = void 0;
const class_validator_1 = require("class-validator");
class CreateBountyDto {
    title;
    description;
    price;
    category;
    environment;
}
exports.CreateBountyDto = CreateBountyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBountyDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBountyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBountyDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['cv_review', 'mock_interview', 'career_planning', 'freelance_consulting']),
    __metadata("design:type", String)
], CreateBountyDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['internTional', 'uniVerse']),
    __metadata("design:type", String)
], CreateBountyDto.prototype, "environment", void 0);
class BookBountyDto {
    bountyId;
    reference;
    clientNotes;
}
exports.BookBountyDto = BookBountyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookBountyDto.prototype, "bountyId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookBountyDto.prototype, "reference", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookBountyDto.prototype, "clientNotes", void 0);
//# sourceMappingURL=dto.js.map