import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { CreateProductDto, PurchaseProductDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('products')
  async getProducts(
    @Query('environment') environment?: string,
    @Query('category') category?: string
  ) {
    return await this.marketplaceService.getProducts(environment, category);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('my-products')
  async getMyProducts(@Req() req) {
    return await this.marketplaceService.getMyProducts(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('create')
  async createProduct(@Req() req, @Body() dto: CreateProductDto) {
    return await this.marketplaceService.createProduct(req.user._id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('purchase')
  async purchaseProduct(@Req() req, @Body() dto: PurchaseProductDto) {
    return await this.marketplaceService.purchaseProduct(req.user._id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('purchases')
  async getMyPurchases(@Req() req) {
    return await this.marketplaceService.getMyPurchases(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('download/:id')
  async downloadProduct(@Req() req, @Param('id') id: string) {
    return await this.marketplaceService.downloadProduct(req.user._id, id);
  }
}
