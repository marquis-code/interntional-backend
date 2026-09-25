import { Model } from 'mongoose';
import { Article, ArticleDocument } from './articles.schema';
export declare class ArticlesService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    getArticles(status?: string, category?: string, search?: string): Promise<(import("mongoose").Document<unknown, {}, ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getArticle(id: string): Promise<(import("mongoose").Document<unknown, {}, ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createArticle(data: any): Promise<import("mongoose").Document<unknown, {}, ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateArticle(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteArticle(id: string): Promise<(import("mongoose").Document<unknown, {}, ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
