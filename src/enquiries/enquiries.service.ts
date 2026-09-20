import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enquiry } from './enquiry.schema';

@Injectable()
export class EnquiriesService {
  constructor(@InjectModel(Enquiry.name) private enquiryModel: Model<Enquiry>) {}

  async create(createDto: { name: string; email: string; message: string }) {
    const createdEnquiry = new this.enquiryModel(createDto);
    return createdEnquiry.save();
  }

  async findAll() {
    return this.enquiryModel.find().sort({ createdAt: -1 }).exec();
  }

  async markAsRead(id: string) {
    return this.enquiryModel.findByIdAndUpdate(id, { status: 'read' }, { new: true }).exec();
  }
}
