import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { Application, ApplicationDocument } from './schemas/application.schema';
import { PaginationParams } from '../utils/pagination.util';
import { NotificationsGateway } from '../notifications/notifications.gateway';
export declare class JobsService {
    private jobModel;
    private applicationModel;
    private readonly notificationsGateway;
    private readonly logger;
    constructor(jobModel: Model<JobDocument>, applicationModel: Model<ApplicationDocument>, notificationsGateway: NotificationsGateway);
    findAll(params?: PaginationParams & {
        status?: string;
    }): Promise<any>;
    create(jobDto: Partial<Job>): Promise<JobDocument>;
    update(id: string, updateData: Partial<Job>): Promise<JobDocument | null>;
    remove(id: string): Promise<JobDocument | null>;
    createApplication(data: Partial<Application>): Promise<ApplicationDocument>;
    getApplications(params?: PaginationParams): Promise<any>;
}
