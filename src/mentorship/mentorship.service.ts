import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMentorshipDto, UpdateMentorshipStatusDto } from './dto/create-mentorship.dto';
import { Mentorship } from './schemas/mentorship.schema';
import { Mentor } from './schemas/mentor.schema';
import { MentorCategory } from './schemas/mentor-category.schema';
import type { PaginationParams } from '../utils/pagination.util';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../utils/email.service';

@Injectable()
export class MentorshipService {
  constructor(
    @InjectModel(Mentorship.name) private mentorshipModel: Model<Mentorship>,
    @InjectModel(Mentor.name) private mentorModel: Model<Mentor>,
    @InjectModel(MentorCategory.name) private mentorCategoryModel: Model<MentorCategory>,
    private readonly notificationsService: NotificationsService,
    private readonly emailService: EmailService,
  ) {}

  async create(createMentorshipDto: CreateMentorshipDto, userId?: string) {
    const newMentorship = new this.mentorshipModel({
      ...createMentorshipDto,
      user: userId,
    });
    const saved = await newMentorship.save();

    if (userId) {
      await this.notificationsService.create({
        userId,
        title: 'Mentorship Request Submitted',
        message: 'Your mentorship request has been submitted and is pending mentor matching.',
        type: 'MENTORSHIP',
        link: '/dashboard/mentorship',
      }).catch(() => {});
    }

    return saved;
  }

  async findMyStatus(userId: string, application?: string) {
    const query: any = { user: userId };
    if (application) {
      query.application = application;
    }
    
    // Find the most recent request for this user and app
    const request = await this.mentorshipModel
      .findOne(query)
      .sort({ createdAt: -1 })
      .populate('matchedMentor')
      .exec();
      
    if (!request) {
      return { status: 'none' };
    }
    
    return {
      status: request.status,
      request,
      mentor: request.matchedMentor || null
    };
  }

  async findAll(params: PaginationParams = {}, application?: string) {
    const { page = 1, limit = 10 } = params;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (application) {
      query.application = application;
    }

    const [data, total] = await Promise.all([
      this.mentorshipModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).populate('user').populate('matchedMentor').exec(),
      this.mentorshipModel.countDocuments(query).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const request = await this.mentorshipModel.findById(id).populate('user').populate('matchedMentor').exec();
    if (!request) throw new NotFoundException('Mentorship request not found');
    return request;
  }

  async updateStatus(id: string, updateDto: UpdateMentorshipStatusDto) {
    const oldRequest = await this.mentorshipModel.findById(id);
    if (!oldRequest) throw new NotFoundException('Mentorship request not found');

    const isNewlyMatched = updateDto.status === 'matched' && oldRequest.status !== 'matched' && updateDto.matchedMentor;

    const request = await this.mentorshipModel.findByIdAndUpdate(
      id,
      { $set: updateDto },
      { new: true },
    ).populate('user').populate('matchedMentor');

    if (!request) throw new NotFoundException('Mentorship request not found');

    if (request.user) {
      const targetUserId = typeof request.user === 'object' && (request.user as any)._id
        ? (request.user as any)._id.toString()
        : request.user.toString();

      await this.notificationsService.create({
        userId: targetUserId,
        title: `Mentorship Status: ${updateDto.status}`,
        message: `Your mentorship request status has been updated to "${updateDto.status}".`,
        type: 'MENTORSHIP',
        link: '/dashboard/mentorship',
      }).catch(() => {});
    }

    // Send emails if newly matched
    if (isNewlyMatched && request.matchedMentor) {
      const mentor = request.matchedMentor as any;
      const menteeName = request.name;
      const menteeEmail = request.email;
      const applicationType = request.application as 'intern' | 'universe';

      // Send to Mentee
      await this.emailService.sendMentorshipMatchedEmailToMentee(
        menteeEmail,
        menteeName.split(' ')[0],
        mentor.name,
        mentor.email,
        applicationType
      );

      // Send to Mentor
      await this.emailService.sendMentorshipMatchedEmailToMentor(
        mentor.email,
        mentor.name.split(' ')[0],
        menteeName,
        menteeEmail,
        request.areaOfInterest,
        applicationType
      );
    }

    return request;
  }

  async remove(id: string) {
    const request = await this.mentorshipModel.findByIdAndDelete(id);
    if (!request) throw new NotFoundException('Mentorship request not found');
    return request;
  }

  // Mentor methods
  async createMentor(createMentorDto: any) {
    const mentor = new this.mentorModel(createMentorDto);
    return mentor.save();
  }

  async findAllMentors() {
    return this.mentorModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateMentor(id: string, updateMentorDto: any) {
    const mentor = await this.mentorModel.findByIdAndUpdate(id, updateMentorDto, { new: true });
    if (!mentor) throw new NotFoundException('Mentor not found');
    return mentor;
  }

  async removeMentor(id: string) {
    const mentor = await this.mentorModel.findByIdAndDelete(id);
    if (!mentor) throw new NotFoundException('Mentor not found');
    return mentor;
  }

  // Category methods
  async createCategory(createCategoryDto: any) {
    const category = new this.mentorCategoryModel(createCategoryDto);
    return category.save();
  }

  async findAllCategories() {
    return this.mentorCategoryModel.find().sort({ name: 1 }).exec();
  }

  async removeCategory(id: string) {
    const category = await this.mentorCategoryModel.findByIdAndDelete(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }
}
