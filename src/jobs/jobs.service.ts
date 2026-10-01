import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { paginateQuery, PaginationParams } from '../utils/pagination.util';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(Application.name) private applicationModel: Model<ApplicationDocument>,
    private readonly notificationsGateway: NotificationsGateway
  ) {}

  async findAll(params: PaginationParams & { status?: string } = {}): Promise<any> {
    const filter = params.status ? { status: params.status } : {};
    return paginateQuery(this.jobModel, filter, params, ['title', 'company', 'location', 'type']);
  }

  async create(jobDto: Partial<Job>): Promise<JobDocument> {
    const newJob = new this.jobModel(jobDto);
    const savedJob = await newJob.save();
    
    // Broadcast job announcement to all clients
    try {
      this.notificationsGateway.sendToAll({
        title: 'New Job Posted!',
        message: `${savedJob.title} at ${savedJob.company} is now available on the Career Hub.`,
        type: 'SYSTEM',
        link: '/dashboard/career',
        metadata: { jobId: savedJob._id }
      });
    } catch (err: any) {
      this.logger.error(`Failed to broadcast job announcement: ${err.message}`);
    }

    return savedJob;
  }

  async update(id: string, updateData: Partial<Job>): Promise<JobDocument | null> {
    return this.jobModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async remove(id: string): Promise<JobDocument | null> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }

  async createApplication(data: Partial<Application>): Promise<ApplicationDocument> {
    const newApp = new this.applicationModel(data);
    return newApp.save();
  }

  async getApplications(params: PaginationParams = {}): Promise<any> {
    return paginateQuery(this.applicationModel, {}, params, ['jobTitle', 'name', 'email']);
  }
}
