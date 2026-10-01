import { Model } from 'mongoose';
export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    role?: string;
}
export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare function paginateQuery<T>(model: Model<T>, query: Record<string, any>, params: PaginationParams, searchFields?: string[], populateOptions?: any, selectOptions?: string): Promise<PaginatedResult<T>>;
