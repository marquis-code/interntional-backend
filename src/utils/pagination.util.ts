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

export async function paginateQuery<T>(
  model: Model<T>,
  query: Record<string, any>,
  params: PaginationParams,
  searchFields: string[] = ['email', 'firstName', 'lastName', 'title', 'name'],
  populateOptions?: any,
  selectOptions?: string
): Promise<PaginatedResult<T>> {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const skip = (page - 1) * limit;

  // Apply Search
  if (params.search) {
    const searchRegex = new RegExp(params.search, 'i');
    const searchConditions = searchFields.map(field => ({ [field]: searchRegex }));
    
    if (query.$and) {
      query.$and.push({ $or: searchConditions });
    } else {
      query.$and = [{ $or: searchConditions }];
    }
  }

  // Apply Date Filters
  if (params.startDate || params.endDate) {
    const dateQuery: any = {};
    if (params.startDate) dateQuery.$gte = new Date(params.startDate);
    if (params.endDate) dateQuery.$lte = new Date(params.endDate);
    
    // Assuming 'createdAt' is the standard timestamp field
    query.createdAt = { ...(query.createdAt || {}), ...dateQuery };
  }

  // Apply specific filters if present
  if (params.status) query.status = params.status;
  if (params.role) query.role = params.role;

  let queryBuilder = model.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });

  if (populateOptions) {
    queryBuilder = queryBuilder.populate(populateOptions);
  }

  if (selectOptions) {
    queryBuilder = queryBuilder.select(selectOptions);
  }

  const [data, total] = await Promise.all([
    queryBuilder.lean().exec(),
    model.countDocuments(query).exec()
  ]);

  return {
    data: data as unknown as T[],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}
