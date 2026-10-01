import { JobsService } from './jobs.service';
import { Job } from './schemas/job.schema';
import { Application } from './schemas/application.schema';
import type { PaginationParams } from '../utils/pagination.util';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(query: PaginationParams & {
        status?: string;
    }): Promise<any>;
    create(body: Partial<Job>): Promise<import("./schemas/job.schema").JobDocument>;
    update(id: string, body: Partial<Job>): Promise<import("./schemas/job.schema").JobDocument | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
    apply(body: Partial<Application>): Promise<import("./schemas/application.schema").ApplicationDocument>;
    getApplications(query: PaginationParams): Promise<any>;
}
