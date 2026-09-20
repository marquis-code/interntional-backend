import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private configService;
    constructor(configService: ConfigService);
    generateUploadSignature(folder: string): {
        timestamp: number;
        signature: string;
        folder: string;
        cloudName: string;
        apiKey: string;
    };
}
