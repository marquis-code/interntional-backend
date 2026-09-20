import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { ResourcesController } from './resources.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Resource.name, schema: ResourceSchema }]),
    StorageModule,
  ],
  controllers: [ResourcesController],
})
export class ResourcesModule {}
