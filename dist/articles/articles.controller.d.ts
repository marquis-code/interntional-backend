import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    getArticles(status?: string, category?: string, search?: string): Promise<(import("mongoose").Document<unknown, {}, import("./articles.schema").ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./articles.schema").Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    getArticle(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./articles.schema").ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./articles.schema").Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    createArticle(data: any): Promise<import("mongoose").Document<unknown, {}, import("./articles.schema").ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./articles.schema").Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    updateArticle(id: string, data: any): Promise<(import("mongoose").Document<unknown, {}, import("./articles.schema").ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./articles.schema").Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    deleteArticle(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./articles.schema").ArticleDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./articles.schema").Article & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
