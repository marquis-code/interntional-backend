import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UniverseController } from './universe.controller';
import { UniverseService } from './universe.service';
import { University, UniversitySchema, Programme, ProgrammeSchema, Student, StudentSchema } from './universe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: University.name, schema: UniversitySchema },
      { name: Programme.name, schema: ProgrammeSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  controllers: [UniverseController],
  providers: [UniverseService]
})
export class UniverseModule {}
