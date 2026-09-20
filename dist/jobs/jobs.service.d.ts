import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: Model<JobDocument>);
    findAll(): Promise<any[]>;
    create(jobDto: Partial<Job>): Promise<JobDocument>;
    remove(id: string): Promise<JobDocument | null>;
}
