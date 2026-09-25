import { Controller, Get, Post, Patch, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get() getForms() { return this.formsService.getForms(); }
  @Get(':id') getForm(@Param('id') id: string) { return this.formsService.getForm(id); }
  @Post() createForm(@Body() data: any) { return this.formsService.createForm(data); }
  @Patch(':id') updateForm(@Param('id') id: string, @Body() data: any) { return this.formsService.updateForm(id, data); }
  @Delete(':id') deleteForm(@Param('id') id: string) { return this.formsService.deleteForm(id); }

  // ---- Submissions ----
  @Post(':id/submit')
  async submitForm(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.formsService.submitForm(id, data);
    } catch (error) {
      throw new HttpException(error.message || 'Submission failed', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/submissions')
  getSubmissions(@Param('id') id: string) { return this.formsService.getSubmissions(id); }

  @Get('stats/submission-counts')
  getSubmissionCounts() { return this.formsService.getSubmissionCounts(); }

  @Patch('submissions/:subId')
  updateSubmission(@Param('subId') subId: string, @Body() data: any) { return this.formsService.updateSubmission(subId, data); }

  @Delete('submissions/:subId')
  deleteSubmission(@Param('subId') subId: string) { return this.formsService.deleteSubmission(subId); }
}
