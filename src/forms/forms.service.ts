import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Form, FormDocument, FormSubmission, FormSubmissionDocument } from './forms.schema';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(FormSubmission.name) private submissionModel: Model<FormSubmissionDocument>,
  ) {}

  // ---- Forms CRUD ----
  async getForms() { return this.formModel.find().sort({ createdAt: -1 }).populate('linkedEvent').populate('linkedProgramme').exec(); }
  async getForm(id: string) { return this.formModel.findById(id).populate('linkedEvent').populate('linkedProgramme').exec(); }
  async createForm(data: any) { return this.formModel.create(data); }
  async updateForm(id: string, data: any) { return this.formModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteForm(id: string) { 
    await this.submissionModel.deleteMany({ formId: id }).exec();
    return this.formModel.findByIdAndDelete(id).exec(); 
  }

  // ---- Submissions ----
  async submitForm(formId: string, data: any) {
    const form = await this.formModel.findById(formId).exec();
    if (!form) throw new Error('Form not found');
    if (form.status !== 'active') throw new Error('This form is not accepting submissions');
    if (form.deadline && new Date() > new Date(form.deadline)) throw new Error('Submission deadline has passed');

    if (form.maxSubmissions && form.maxSubmissions > 0) {
      const count = await this.submissionModel.countDocuments({ formId }).exec();
      if (count >= form.maxSubmissions) throw new Error('Maximum submissions reached');
    }

    if (!form.allowMultipleSubmissions && data.submitterEmail) {
      const existing = await this.submissionModel.findOne({ formId, submitterEmail: data.submitterEmail }).exec();
      if (existing) throw new Error('You have already submitted this form');
    }

    return this.submissionModel.create({
      formId,
      data: data.data,
      submitterEmail: data.submitterEmail,
      submitterName: data.submitterName,
    });
  }

  async getSubmissions(formId: string) {
    return this.submissionModel.find({ formId }).sort({ createdAt: -1 }).exec();
  }

  async getSubmissionCount(formId: string) {
    return this.submissionModel.countDocuments({ formId }).exec();
  }

  async getSubmissionCounts() {
    return this.submissionModel.aggregate([
      { $group: { _id: '$formId', count: { $sum: 1 } } }
    ]).exec();
  }

  async updateSubmission(id: string, data: any) {
    return this.submissionModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteSubmission(id: string) {
    return this.submissionModel.findByIdAndDelete(id).exec();
  }
}
