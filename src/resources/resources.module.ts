import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { ResourcePurchase, ResourcePurchaseSchema } from './schemas/resource-purchase.schema';
import { ResourcesController } from './resources.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
      { name: ResourcePurchase.name, schema: ResourcePurchaseSchema }
    ]),
    StorageModule,
  ],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
