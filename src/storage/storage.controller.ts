import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('signature')
  getUploadSignature(@Body() body: { folder: string }) {
    // Both unauthenticated (registration) and authenticated (vault) can request a signature.
    // The folder differentiates where it goes.
    const folder = body.folder || 'interntional/general';
    return this.storageService.generateUploadSignature(folder);
  }
}
