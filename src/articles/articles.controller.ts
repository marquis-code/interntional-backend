import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get() getArticles(
    @Query('status') status?: string, 
    @Query('category') category?: string, 
    @Query('search') search?: string
  ) { 
    return this.articlesService.getArticles(status, category, search); 
  }
  @Get(':id') getArticle(@Param('id') id: string) { return this.articlesService.getArticle(id); }
  @Post() createArticle(@Body() data: any) { return this.articlesService.createArticle(data); }
  @Patch(':id') updateArticle(@Param('id') id: string, @Body() data: any) { return this.articlesService.updateArticle(id, data); }
  @Delete(':id') deleteArticle(@Param('id') id: string) { return this.articlesService.deleteArticle(id); }
}
