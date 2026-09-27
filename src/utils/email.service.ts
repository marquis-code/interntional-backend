import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { buildEmailTemplate } from './email-template';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;
  private readonly fromEmail = process.env.EMAIL_FROM || 'Medlabconvo <noreply@medlabconvo.com>';

  constructor() {
    // In production, use process.env.RESEND_API_KEY
    this.resend = new Resend(process.env.RESEND_API_KEY || process.env.RESEND_API || 're_dummy_key');
  }

  async sendApplicationReceivedEmail(email: string, firstName: string, source: 'intern' | 'universe' = 'intern') {
    const title = 'We have received your application!';
    const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Thank you for applying to join our community.</p>
      <p style="margin-bottom: 15px;">Our admin team is currently reviewing your profile to ensure it meets our community guidelines. We will get back to you within 24-48 hours with an update.</p>
    `;
    const html = buildEmailTemplate(title, bodyContent, source);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Application received email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }

  async sendAccountApprovedEmail(email: string, firstName: string, token?: string, source: 'intern' | 'universe' = 'intern') {
    const primaryColor = '#27628C'; // Convo brand color
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
    } else {
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
    const html = buildEmailTemplate(title, bodyContent, source);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Account approved email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }

  async sendAccountRejectedEmail(email: string, firstName: string, source: 'intern' | 'universe' = 'intern') {
    const title = 'Update regarding your application';
    const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Thank you for your interest in joining our community.</p>
      <p style="margin-bottom: 15px;">After carefully reviewing your application, we regret to inform you that we are unable to approve your account at this time. This is often because the information provided did not meet our current verification criteria.</p>
      <p style="margin-bottom: 15px;">If you believe this was an error, please reach out to our support team.</p>
    `;
    const html = buildEmailTemplate(title, bodyContent, source);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Account rejected email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }

  async sendPasswordResetEmail(email: string, firstName: string, token: string, source: 'intern' | 'universe' = 'intern') {
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
    const html = buildEmailTemplate(title, bodyContent, source);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}`, error);
    }
  }

  // --- NEW SUBSCRIPTION EMAILS ---

  async sendSubscriptionActivatedEmail(email: string, firstName: string, planName: string, source: 'intern' | 'universe' = 'intern') {
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
    const html = buildEmailTemplate(title, bodyContent, source, cancelLink);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Subscription activated email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send subscription activated email to ${email}`, error);
    }
  }

  async sendSubscriptionReminderEmail(email: string, firstName: string, planName: string, daysLeft: number, source: 'intern' | 'universe' = 'intern') {
    const cancelLink = `${process.env.VITE_BASE_URL || 'http://localhost:3000'}/dashboard/subscription/cancel`;
    
    const title = 'Upcoming Subscription Renewal';
    const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">This is a friendly reminder that your <strong>${planName}</strong> subscription is scheduled to renew in <strong>${daysLeft} days</strong>.</p>
      <p style="margin-bottom: 15px;">To ensure uninterrupted access to all your benefits, we will automatically process your renewal using your saved payment method.</p>
      <p style="margin-bottom: 15px;">If you need to update your payment details or review your plan, you can do so from your dashboard.</p>
    `;
    const html = buildEmailTemplate(title, bodyContent, source, cancelLink);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Subscription reminder email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send reminder email to ${email}`, error);
    }
  }

  async sendOtpEmail(email: string, firstName: string, otp: string, source: 'intern' | 'universe' = 'intern') {
    const title = 'Your Verification Code';
    const bodyContent = `
      <h2 style="color: #1f2937; margin-bottom: 20px;">Hello ${firstName},</h2>
      <p style="margin-bottom: 15px;">Please use the following 4-digit code to verify your email address. This code will expire in 10 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #1f2937; background-color: #f3f4f6; padding: 10px 20px; border-radius: 8px;">${otp}</span>
      </div>
      <p style="margin-top: 20px;">If you didn't request this code, you can safely ignore this email.</p>
    `;
    const html = buildEmailTemplate(title, bodyContent, source);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`OTP email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${email}`, error);
    }
  }

  async sendUpgradeReminderEmail(email: string, firstName: string, currentPlan: string, source: 'intern' | 'universe' = 'intern') {
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
    const html = buildEmailTemplate(title, bodyContent, source);

    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: title,
        html,
      });
      this.logger.log(`Upgrade reminder email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send upgrade reminder to ${email}`, error);
    }
  }
}
