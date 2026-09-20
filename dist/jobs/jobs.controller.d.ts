import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(): Promise<any[]>;
    create(body: Partial<Job>): Promise<import("./schemas/job.schema").JobDocument>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
