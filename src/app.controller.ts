import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Department } from './users/schemas/user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('departments')
  getDepartments() {
    return Object.values(Department).map(value => ({
      label: value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '),
      value
    }));
  }
}
