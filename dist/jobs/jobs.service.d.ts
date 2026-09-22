import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { PaginationParams } from '../utils/pagination.util';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    findAll(params?: PaginationParams): Promise<any>;
    create(jobDto: Partial<Job>): Promise<JobDocument>;
    remove(id: string): Promise<JobDocument | null>;
}
