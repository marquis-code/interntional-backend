"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateQuery = paginateQuery;
async function paginateQuery(model, query, params, searchFields = ['email', 'firstName', 'lastName', 'title', 'name'], populateOptions, selectOptions) {
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const skip = (page - 1) * limit;
    if (params.search) {
        const searchRegex = new RegExp(params.search, 'i');
        const searchConditions = searchFields.map(field => ({ [field]: searchRegex }));
        if (query.$and) {
            query.$and.push({ $or: searchConditions });
        }
        else {
            query.$and = [{ $or: searchConditions }];
        }
    }
    if (params.startDate || params.endDate) {
        const dateQuery = {};
        if (params.startDate)
            dateQuery.$gte = new Date(params.startDate);
        if (params.endDate)
            dateQuery.$lte = new Date(params.endDate);
        query.createdAt = { ...(query.createdAt || {}), ...dateQuery };
    }
    if (params.status)
        query.status = params.status;
    if (params.role)
        query.role = params.role;
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
        data: data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}
//# sourceMappingURL=pagination.util.js.map