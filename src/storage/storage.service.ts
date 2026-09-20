import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class StorageService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'mock-cloud',
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY') || 'mock-key',
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET') || 'mock-secret',
    });
  }

  /**
   * Generates a signature for the frontend to upload files directly to Cloudinary.
   */
  generateUploadSignature(folder: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      this.configService.get<string>('CLOUDINARY_API_SECRET') || 'mock-secret'
    );

    return {
      timestamp,
      signature,
      folder,
      cloudName: this.configService.get<string>('CLOUDINARY_CLOUD_NAME') || 'mock-cloud',
      apiKey: this.configService.get<string>('CLOUDINARY_API_KEY') || 'mock-key',
    };
  }
}
