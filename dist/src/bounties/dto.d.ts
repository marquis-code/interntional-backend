export declare class CreateBountyDto {
    title: string;
    description: string;
    price: number;
    category: string;
    environment: string;
}
export declare class BookBountyDto {
    bountyId: string;
    reference: string;
    clientNotes?: string;
}
