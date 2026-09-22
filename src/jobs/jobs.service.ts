import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { paginateQuery, PaginationParams } from '../utils/pagination.util';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async findAll(params: PaginationParams = {}): Promise<any> {
    return paginateQuery(this.jobModel, {}, params, ['title', 'company', 'location', 'type']);
  }

  async create(jobDto: Partial<Job>): Promise<JobDocument> {
    const newJob = new this.jobModel(jobDto);
    return newJob.save();
  }

  async remove(id: string): Promise<JobDocument | null> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
}
