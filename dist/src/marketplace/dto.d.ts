export declare class CreateProductDto {
    title: string;
    description: string;
    price: number;
    coverImage?: string;
    fileUrl: string;
    category: string;
    environment: string;
}
export declare class PurchaseProductDto {
    productId: string;
    reference: string;
}
