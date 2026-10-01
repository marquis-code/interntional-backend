"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMentorshipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mentorship_dto_1 = require("./create-mentorship.dto");
class UpdateMentorshipDto extends (0, mapped_types_1.PartialType)(create_mentorship_dto_1.CreateMentorshipDto) {
}
exports.UpdateMentorshipDto = UpdateMentorshipDto;
//# sourceMappingURL=update-mentorship.dto.js.map