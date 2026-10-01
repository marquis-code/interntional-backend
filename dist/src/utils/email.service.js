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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const resend_1 = require("resend");
const email_template_1 = require("./email-template");
let EmailService = EmailService_1 = class EmailService {
    logger = new common_1.Logger(EmailService_1.name);
    resend;
    fromEmail = process.env.EMAIL_FROM || 'Medlabconvo <noreply@medlabconvo.com>';
    constructor() {
        this.resend = new resend_1.Resend(process.env.RESEND_API_KEY || process.env.RESEND_API || 're_dummy_key');
    }
    async sendApplicationReceivedEmail(email, firstName, source = 'intern') {
        const title = 'We have received your application!';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Thank you for applying to join our community.</p>
      <p style="margin-bottom: 15px;">Our admin team is currently reviewing your profile to ensure it meets our community guidelines. We will get back to you within 24-48 hours with an update.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Application received email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${email}`, error);
        }
    }
    async sendAccountApprovedEmail(email, firstName, token, source = 'intern') {
        const primaryColor = '#27628C';
        const title = '🎉 You are In! Welcome Aboard';
        let bodyContent = '';
        if (token) {
            const baseUrl = source === 'universe' ? 'https://universe.medlabconvo.com' : 'https://interntional.medlabconvo.com';
            const setupUrl = `${baseUrl}/setup-password?token=${token}`;
            bodyContent = `
        <h2 style="color: #1f2937; margin-bottom: 20px;">Congratulations ${firstName}!</h2>
        <p style="margin-bottom: 15px;">Your account has been officially approved by our admin team.</p>
        <p style="margin-bottom: 25px;">To finalize your registration and access your dashboard, please click the secure link below to set up your password:</p>
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${setupUrl}" style="background-color: ${primaryColor}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Set Up My Password</a>
        </div>
        <p style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">If the button doesn't work, copy and paste this link into your browser: <br/><a href="${setupUrl}" style="color: ${primaryColor}; word-break: break-all;">${setupUrl}</a></p>
        <p style="margin-top: 30px;">Welcome aboard!</p>
      `;
        }
        else {
            const loginUrl = `${source === 'intern' ? 'https://interntional.medlabconvo.com' : 'https://universe.medlabconvo.com'}/login`;
            bodyContent = `
        <h2 style="color: #1f2937; margin-bottom: 20px;">Congratulations ${firstName}!</h2>
        <p style="margin-bottom: 15px;">Your account has been officially approved by our admin team.</p>
        <p style="margin-bottom: 25px;">You can now log in to your dashboard using the email and password you created during registration.</p>
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${loginUrl}" style="background-color: ${primaryColor}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Log In Now</a>
        </div>
        <p style="margin-top: 30px;">Welcome aboard!</p>
      `;
        }
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Account approved email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${email}`, error);
        }
    }
    async sendAccountRejectedEmail(email, firstName, source = 'intern') {
        const title = 'Update regarding your application';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Thank you for your interest in joining our community.</p>
      <p style="margin-bottom: 15px;">After carefully reviewing your application, we regret to inform you that we are unable to approve your account at this time. This is often because the information provided did not meet our current verification criteria.</p>
      <p style="margin-bottom: 15px;">If you believe this was an error, please reach out to our support team.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Account rejected email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${email}`, error);
        }
    }
    async sendPasswordResetEmail(email, firstName, token, source = 'intern') {
        const primaryColor = '#27628C';
        const title = 'Reset Your Password';
        const resetUrl = `${source === 'intern' ? 'https://interntional.medlabconvo.com' : 'https://universe.medlabconvo.com'}/reset-password?token=${token}`;
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <p style="margin-bottom: 25px;">To reset your password, click the button below:</p>
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${resetUrl}" style="background-color: ${primaryColor}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Reset Password</a>
      </div>
      <p style="font-size: 13px; color: #6b7280; margin-bottom: 15px;">If the button doesn't work, copy and paste this link into your browser: <br/><a href="${resetUrl}" style="color: ${primaryColor}; word-break: break-all;">${resetUrl}</a></p>
      <p style="margin-top: 30px;">Best regards,<br>The Team</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Password reset email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send password reset email to ${email}`, error);
        }
    }
    async sendMentorshipMatchedEmailToMentee(email, firstName, mentorName, mentorEmail, source = 'intern') {
        const title = 'Great News! You Have Been Matched with a Mentor 🎉';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">We are thrilled to let you know that you have been successfully matched with a mentor!</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0;"><strong>Mentor Name:</strong> ${mentorName}</p>
        <p style="margin: 0;"><strong>Mentor Email:</strong> <a href="mailto:${mentorEmail}" style="color: #27628C;">${mentorEmail}</a></p>
      </div>
      <p style="margin-bottom: 15px;">Please feel free to reach out to them via email to introduce yourself and kick off your mentorship journey.</p>
      <p style="margin-bottom: 15px;">We wish you the best of luck with your collaborations!</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({ from: this.fromEmail, to: email, subject: title, html });
            this.logger.log(`Mentorship match email sent to mentee ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send mentorship email to mentee ${email}`, error);
        }
    }
    async sendMentorshipMatchedEmailToMentor(email, mentorName, menteeName, menteeEmail, areaOfInterest, source = 'intern') {
        const title = 'You Have a New Mentee! 🎉';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${mentorName},</h2>
      <p style="margin-bottom: 15px;">Thank you for your dedication to guiding the next generation. We have successfully matched you with a new mentee who is eager to learn from your expertise in <strong>${areaOfInterest}</strong>!</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0;"><strong>Mentee Name:</strong> ${menteeName}</p>
        <p style="margin: 0;"><strong>Mentee Email:</strong> <a href="mailto:${menteeEmail}" style="color: #27628C;">${menteeEmail}</a></p>
      </div>
      <p style="margin-bottom: 15px;">Your mentee has been provided with your contact details as well. You can expect them to reach out soon, or feel free to send them a welcoming email.</p>
      <p style="margin-bottom: 15px;">Thank you for your invaluable contribution to the community!</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({ from: this.fromEmail, to: email, subject: title, html });
            this.logger.log(`Mentorship match email sent to mentor ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send mentorship email to mentor ${email}`, error);
        }
    }
    async sendSubscriptionActivatedEmail(email, firstName, planName, source = 'intern') {
        const cancelLink = `${process.env.VITE_BASE_URL || 'http://localhost:3000'}/dashboard/subscription/cancel`;
        const primaryColor = source === 'universe' ? '#8B5CF6' : '#2563EB';
        const title = 'Your Subscription is Active! 🚀';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Great news! Your <strong>${planName}</strong> subscription has been successfully activated.</p>
      <p style="margin-bottom: 25px;">You now have full access to all the premium features and resources included in your plan. We're thrilled to have you onboard!</p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${process.env.VITE_BASE_URL || 'http://localhost:3000'}/dashboard" style="background-color: ${primaryColor}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">Go to Dashboard</a>
      </div>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source, cancelLink);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Subscription activated email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send subscription activated email to ${email}`, error);
        }
    }
    async sendSubscriptionReminderEmail(email, firstName, planName, daysLeft, source = 'intern') {
        const cancelLink = `${process.env.VITE_BASE_URL || 'http://localhost:3000'}/dashboard/subscription/cancel`;
        const title = 'Upcoming Subscription Renewal';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">This is a friendly reminder that your <strong>${planName}</strong> subscription is scheduled to renew in <strong>${daysLeft} days</strong>.</p>
      <p style="margin-bottom: 15px;">To ensure uninterrupted access to all your benefits, we will automatically process your renewal using your saved payment method.</p>
      <p style="margin-bottom: 15px;">If you need to update your payment details or review your plan, you can do so from your dashboard.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source, cancelLink);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Subscription reminder email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send reminder email to ${email}`, error);
        }
    }
    async sendOtpEmail(email, firstName, otp, source = 'intern') {
        const title = 'Your Verification Code';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Please use the following 4-digit code to verify your email address. This code will expire in 10 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1f2937; background-color: #f3f4f6; padding: 10px 20px; border-radius: 8px;">${otp}</span>
      </div>
      <p style="margin-top: 20px;">If you didn't request this code, you can safely ignore this email.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`OTP email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send OTP email to ${email}`, error);
        }
    }
    async sendUpgradeReminderEmail(email, firstName, currentPlan, source = 'intern') {
        const title = 'Unlock More Premium Features!';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hi ${firstName},</h2>
      <p style="margin-bottom: 15px;">You are currently enjoying the <strong>${currentPlan}</strong> plan.</p>
      <p style="margin-bottom: 15px;">Did you know you can unlock even more exclusive clinical guides, priority mentorship access, and advanced features by upgrading your subscription?</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${source === 'intern' ? 'https://interntional.com' : 'https://universe.com'}/dashboard/subscription" style="background-color: #27628C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(39, 98, 140, 0.2);">Explore Premium Plans</a>
      </div>
      <p style="margin-top: 20px;">Upgrade today and take your career to the next level!</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Upgrade reminder email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send upgrade reminder to ${email}`, error);
        }
    }
    async sendAdminLoginOtpEmail(email, firstName, otp) {
        const title = 'Admin Login Verification Code';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Someone (hopefully you) just attempted to sign in to the Admin Portal. Use the code below to complete your login.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #1f2937; background-color: #f0f9ff; border: 2px solid #27628C; padding: 14px 28px; border-radius: 10px; display: inline-block;">${otp}</span>
      </div>
      <p style="margin-top: 20px; color: #6b7280;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <p style="margin-top: 10px; color: #ef4444;">If you did not attempt to log in, please contact your system administrator immediately.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, 'intern');
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: `[Admin] Your login verification code is ${otp}`,
                html,
            });
            this.logger.log(`Admin login OTP sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send admin OTP to ${email}`, error);
        }
    }
    async sendLoginOtpEmail(email, firstName, otp, source = 'intern') {
        const brandName = source === 'universe' ? 'UniVerse' : 'InternTional';
        const primaryColor = source === 'universe' ? '#27628C' : '#27628C';
        const title = `${brandName} Login Verification Code`;
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName || 'Member'},</h2>
      <p style="margin-bottom: 15px;">Someone (hopefully you) just attempted to sign in to your ${brandName} account. Use the 6-digit verification code below to complete your login.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #1f2937; background-color: #f0f9ff; border: 2px solid ${primaryColor}; padding: 14px 28px; border-radius: 10px; display: inline-block;">${otp}</span>
      </div>
      <p style="margin-top: 20px; color: #6b7280;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
      <p style="margin-top: 10px; color: #ef4444;">If you did not attempt to sign in, please secure your account immediately.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: `Your ${brandName} verification code is ${otp}`,
                html,
            });
            this.logger.log(`[AUTH OTP] Login verification code sent to ${email}: ${otp}`);
        }
        catch (error) {
            this.logger.error(`Failed to send login OTP to ${email}`, error);
            this.logger.log(`[AUTH OTP FALLBACK] Verification code for ${email}: ${otp}`);
        }
    }
    async sendAdminPasswordResetEmail(email, firstName, token) {
        const resetUrl = `https://admin.medlabconvo.com/reset-password?token=${token}`;
        const title = 'Admin Password Reset Request';
        const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">We received a request to reset your Admin Portal password. If you didn't make this request, please ignore this email.</p>
      <p style="margin-bottom: 25px;">Click the button below to reset your password. This link expires in <strong>1 hour</strong>.</p>
      <div style="text-align: center; margin-bottom: 30px;">
        <a href="${resetUrl}" style="background-color: #27628C; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Reset Admin Password</a>
      </div>
      <p style="color: #6b7280; font-size: 13px;">Or copy this link: <br/><a href="${resetUrl}" style="color: #27628C;">${resetUrl}</a></p>
      <p style="margin-top: 20px; color: #ef4444; font-size: 13px;">⚠️ Never share this link with anyone.</p>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, 'intern');
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: 'Admin Portal — Password Reset Request',
                html,
            });
            this.logger.log(`Admin password reset email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send admin password reset email to ${email}`, error);
        }
    }
    async sendStatusUpdateEmail(email, firstName, formTitle, statusFormatted, source = 'intern') {
        const title = `Status Update: ${formTitle}`;
        const bodyContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #02508b;">Submission Status Update</h2>
        <p style="margin-bottom: 15px;">Hello ${firstName},</p>
        <p style="margin-bottom: 15px;">Your submission for <strong>${formTitle}</strong> has been updated.</p>
        <p style="margin-bottom: 15px;">New Status: <strong style="color: #02508b;">${statusFormatted}</strong></p>
        <p style="margin-top: 25px;">Thank you.</p>
      </div>
    `;
        const html = (0, email_template_1.buildEmailTemplate)(title, bodyContent, source);
        try {
            await this.resend.emails.send({
                from: this.fromEmail,
                to: email,
                subject: title,
                html,
            });
            this.logger.log(`Status update email sent to ${email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send status update email to ${email}`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map