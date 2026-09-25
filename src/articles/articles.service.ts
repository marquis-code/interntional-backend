import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './articles.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

  async getArticles(status?: string, category?: string, search?: string) { 
    const query: any = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    return this.articleModel.find(query).sort({ createdAt: -1 }).exec(); 
  }
  async getArticle(id: string) { return this.articleModel.findById(id).exec(); }
  async createArticle(data: any) { return this.articleModel.create(data); }
  async updateArticle(id: string, data: any) { return this.articleModel.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteArticle(id: string) { return this.articleModel.findByIdAndDelete(id).exec(); }
}
