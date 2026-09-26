import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;
  private readonly fromEmail = 'Convo Commerce <noreply@convocommerce.com>'; // Update with verified domain

  constructor() {
    // In production, use process.env.RESEND_API_KEY
    this.resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');
  }

  async sendApplicationReceivedEmail(email: string, firstName: string) {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'We have received your application to Convo Commerce!',
        html: `
          <h2>Hello ${firstName},</h2>
          <p>Thank you for applying to join the Convo Commerce community.</p>
          <p>Our admin team is currently reviewing your profile to ensure it meets our community guidelines. We will get back to you within 24-48 hours with an update.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>The Convo Commerce Team</strong></p>
        `,
      });
      this.logger.log(`Application received email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }

  async sendAccountApprovedEmail(email: string, firstName: string, token: string) {
    const setupUrl = `${process.env.VITE_BASE_URL || 'http://localhost:3000'}/setup-password?token=${token}`;
    
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: '🎉 You are In! Welcome to Convo Commerce',
        html: `
          <h2>Congratulations ${firstName}!</h2>
          <p>Your account has been officially approved by our admin team.</p>
          <p>To finalize your registration and access your dashboard, please click the secure link below to set up your password:</p>
          <br />
          <a href="${setupUrl}" style="background-color: #1f4e70; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Set Up My Password</a>
          <br /><br />
          <p>If the button doesn't work, copy and paste this link into your browser: <br/>${setupUrl}</p>
          <br />
          <p>Welcome aboard,</p>
          <p><strong>The Convo Commerce Team</strong></p>
        `,
      });
      this.logger.log(`Account approved email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }

  async sendAccountRejectedEmail(email: string, firstName: string) {
    try {
      await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: 'Update regarding your application',
        html: `
          <h2>Hello ${firstName},</h2>
          <p>Thank you for your interest in joining Convo Commerce.</p>
          <p>After carefully reviewing your application, we regret to inform you that we are unable to approve your account at this time. This is often because the information provided did not meet our current verification criteria.</p>
          <p>If you believe this was an error, please reach out to our support team.</p>
          <br />
          <p>Best regards,</p>
          <p><strong>The Convo Commerce Team</strong></p>
        `,
      });
      this.logger.log(`Account rejected email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${email}`, error);
    }
  }
}
