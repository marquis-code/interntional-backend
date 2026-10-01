export declare class EmailService {
    private readonly logger;
    private resend;
    private readonly fromEmail;
    constructor();
    sendApplicationReceivedEmail(email: string, firstName: string, source?: 'intern' | 'universe'): Promise<void>;
    sendAccountApprovedEmail(email: string, firstName: string, token?: string, source?: 'intern' | 'universe'): Promise<void>;
    sendAccountRejectedEmail(email: string, firstName: string, source?: 'intern' | 'universe'): Promise<void>;
    sendPasswordResetEmail(email: string, firstName: string, token: string, source?: 'intern' | 'universe'): Promise<void>;
    sendMentorshipMatchedEmailToMentee(email: string, firstName: string, mentorName: string, mentorEmail: string, source?: 'intern' | 'universe'): Promise<void>;
    sendMentorshipMatchedEmailToMentor(email: string, mentorName: string, menteeName: string, menteeEmail: string, areaOfInterest: string, source?: 'intern' | 'universe'): Promise<void>;
    sendSubscriptionActivatedEmail(email: string, firstName: string, planName: string, source?: 'intern' | 'universe'): Promise<void>;
    sendSubscriptionReminderEmail(email: string, firstName: string, planName: string, daysLeft: number, source?: 'intern' | 'universe'): Promise<void>;
    sendOtpEmail(email: string, firstName: string, otp: string, source?: 'intern' | 'universe'): Promise<void>;
    sendUpgradeReminderEmail(email: string, firstName: string, currentPlan: string, source?: 'intern' | 'universe'): Promise<void>;
    sendAdminLoginOtpEmail(email: string, firstName: string, otp: string): Promise<void>;
    sendLoginOtpEmail(email: string, firstName: string, otp: string, source?: 'intern' | 'universe'): Promise<void>;
    sendAdminPasswordResetEmail(email: string, firstName: string, token: string): Promise<void>;
    sendStatusUpdateEmail(email: string, firstName: string, formTitle: string, statusFormatted: string, source?: 'intern' | 'universe'): Promise<void>;
}
