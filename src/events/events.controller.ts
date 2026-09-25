import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get() getEvents() { return this.eventsService.getEvents(); }
  @Get(':id') getEvent(@Param('id') id: string) { return this.eventsService.getEvent(id); }
  @Post() createEvent(@Body() data: any) { return this.eventsService.createEvent(data); }
  @Patch(':id') updateEvent(@Param('id') id: string, @Body() data: any) { return this.eventsService.updateEvent(id, data); }
  @Delete(':id') deleteEvent(@Param('id') id: string) { return this.eventsService.deleteEvent(id); }

  // ---- Registrations ----
  @Post(':id/register')
  async registerForEvent(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.eventsService.registerForEvent(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Registration failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/registrations')
  getRegistrations(@Param('id') id: string) {
    return this.eventsService.getRegistrations(id);
  }

  @Get('stats/registration-counts')
  getRegistrationCounts() {
    return this.eventsService.getRegistrationCounts();
  }

  @Delete('registrations/:regId')
  deleteRegistration(@Param('regId') regId: string) {
    return this.eventsService.deleteRegistration(regId);
  }
}
