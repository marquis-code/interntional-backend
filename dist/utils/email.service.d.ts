export declare class EmailService {
    private readonly logger;
    private resend;
    private readonly fromEmail;
    constructor();
    sendApplicationReceivedEmail(email: string, firstName: string, source?: 'intern' | 'universe'): Promise<void>;
    sendAccountApprovedEmail(email: string, firstName: string, token?: string, source?: 'intern' | 'universe'): Promise<void>;
    sendAccountRejectedEmail(email: string, firstName: string, source?: 'intern' | 'universe'): Promise<void>;
    sendPasswordResetEmail(email: string, firstName: string, token: string, source?: 'intern' | 'universe'): Promise<void>;
    sendSubscriptionActivatedEmail(email: string, firstName: string, planName: string, source?: 'intern' | 'universe'): Promise<void>;
    sendSubscriptionReminderEmail(email: string, firstName: string, planName: string, daysLeft: number, source?: 'intern' | 'universe'): Promise<void>;
    sendOtpEmail(email: string, firstName: string, otp: string, source?: 'intern' | 'universe'): Promise<void>;
    sendUpgradeReminderEmail(email: string, firstName: string, currentPlan: string, source?: 'intern' | 'universe'): Promise<void>;
}
