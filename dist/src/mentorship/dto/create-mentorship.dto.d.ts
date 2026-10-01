export declare class CreateMentorshipDto {
    name: string;
    email: string;
    areaOfInterest: string;
    application: string;
}
export declare class UpdateMentorshipStatusDto {
    status: string;
    matchedMentor?: string;
    notes?: string;
}
