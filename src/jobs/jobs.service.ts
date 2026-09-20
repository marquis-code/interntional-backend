import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async findAll(): Promise<any[]> {
    return this.jobModel.find().sort({ createdAt: -1 }).lean().exec();
  }

  async create(jobDto: Partial<Job>): Promise<JobDocument> {
    const newJob = new this.jobModel(jobDto);
    return newJob.save();
  }

  async remove(id: string): Promise<JobDocument | null> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
}
