import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UniversityDocument = University & Document;

@Schema({ timestamps: true })
export class University {
  @Prop({ required: true })
  name: string;

  @Prop()
  location: string;

  @Prop({ default: 'active' })
  status: string;
}
export const UniversitySchema = SchemaFactory.createForClass(University);


export type ProgrammeDocument = Programme & Document;

@Schema({ timestamps: true })
export class Programme {
  @Prop({ required: true })
  name: string;

  @Prop()
  department: string;

  @Prop({ type: Types.ObjectId, ref: 'University' })
  universityId: Types.ObjectId;

  @Prop({ default: 'active' })
  status: string;
}
export const ProgrammeSchema = SchemaFactory.createForClass(Programme);


export type StudentDocument = Student & Document;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'University' })
  universityId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Programme' })
  programmeId: Types.ObjectId;

  @Prop({ default: 'enrolled' })
  status: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);
