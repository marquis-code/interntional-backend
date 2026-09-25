import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { University, UniversityDocument, Programme, ProgrammeDocument, Student, StudentDocument } from './universe.schema';

@Injectable()
export class UniverseService {
  constructor(
    @InjectModel(University.name) private universityModel: Model<UniversityDocument>,
    @InjectModel(Programme.name) private programmeModel: Model<ProgrammeDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  // --- Universities ---
  async getUniversities() { return this.universityModel.find().exec(); }
  async createUniversity(data: any) { return this.universityModel.create(data); }
  async updateUniversity(id: string, data: any) { return this.universityModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteUniversity(id: string) { return this.universityModel.findByIdAndDelete(id).exec(); }

  // --- Programmes ---
  async getProgrammes() { return this.programmeModel.find().populate('universityId').exec(); }
  async createProgramme(data: any) { return this.programmeModel.create(data); }
  async updateProgramme(id: string, data: any) { return this.programmeModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteProgramme(id: string) { return this.programmeModel.findByIdAndDelete(id).exec(); }

  // --- Students ---
  async getStudents() { return this.studentModel.find().populate('universityId').populate('programmeId').exec(); }
  async createStudent(data: any) { return this.studentModel.create(data); }
  async updateStudent(id: string, data: any) { return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteStudent(id: string) { return this.studentModel.findByIdAndDelete(id).exec(); }
}
