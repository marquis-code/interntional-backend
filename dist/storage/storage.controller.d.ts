import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    getUploadSignature(body: {
        folder: string;
    }): {
        timestamp: number;
        signature: string;
        folder: string;
        eager: string;
        cloudName: string;
        apiKey: string;
    };
}
