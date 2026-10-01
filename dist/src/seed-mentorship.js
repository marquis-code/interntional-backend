"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mentorship_service_1 = require("./mentorship/mentorship.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./users/schemas/user.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
    const mentorshipService = app.get(mentorship_service_1.MentorshipService);
    const emails = ['abahkauzy3@gmail.com', 'ajayiatilola03@gmail.com'];
    const mentor1 = await mentorshipService.createMentor({
        firstName: 'Robert',
        lastName: 'DeBate',
        email: 'robert@example.com',
        jobTitle: 'Lab Director',
        bio: 'Twenty years managing teams and building quality systems in clinical labs.',
        specializations: ['Lab Management', 'Operations'],
        company: 'Clina Labs'
    });
    console.log('Created dummy mentor');
    for (const email of emails) {
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log(`User not found: ${email}`);
            continue;
        }
        console.log(`Creating mentorship for: ${email}`);
        const request = await mentorshipService.create({
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            areaOfInterest: 'Lab Management',
            application: 'universe'
        }, user._id.toString());
        await mentorshipService.updateStatus(request._id.toString(), {
            status: 'matched',
            matchedMentor: mentor1._id.toString(),
            notes: 'Auto matched via seeder'
        });
        console.log(`Successfully seeded matched mentorship for ${email}`);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed-mentorship.js.map