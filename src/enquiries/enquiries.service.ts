import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry } from './enquiry.schema';
import { paginateQuery, PaginationParams } from '../utils/pagination.util';

@Injectable()
export class EnquiriesService {
  constructor(@InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>) {}

  async create(createDto: { name: string; email: string; message: string }) {
    const createdEnquiry = new this.enquiryModel(createDto);
    return createdEnquiry.save();
  }

  async findAll(params: PaginationParams = {}) {
    return paginateQuery(
      this.enquiryModel,
      {},
      params,
      ['name', 'email', 'message', 'status']
    );
  }

  async markAsRead(id: string) {
    return this.enquiryModel.findByIdAndUpdate(id, { status: 'read' }, { new: true }).exec();
  }
}
