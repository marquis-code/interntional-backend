import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UniverseService } from './universe.service';

@Controller('universe')
export class UniverseController {
  constructor(private readonly universeService: UniverseService) {}

  // --- Universities ---
  @Get('universities') getUniversities() { return this.universeService.getUniversities(); }
  @Post('universities') createUniversity(@Body() data: any) { return this.universeService.createUniversity(data); }
  @Patch('universities/:id') updateUniversity(@Param('id') id: string, @Body() data: any) { return this.universeService.updateUniversity(id, data); }
  @Delete('universities/:id') deleteUniversity(@Param('id') id: string) { return this.universeService.deleteUniversity(id); }

  // --- Programmes ---
  @Get('programmes') getProgrammes() { return this.universeService.getProgrammes(); }
  @Post('programmes') createProgramme(@Body() data: any) { return this.universeService.createProgramme(data); }
  @Patch('programmes/:id') updateProgramme(@Param('id') id: string, @Body() data: any) { return this.universeService.updateProgramme(id, data); }
  @Delete('programmes/:id') deleteProgramme(@Param('id') id: string) { return this.universeService.deleteProgramme(id); }

  // --- Students ---
  @Get('students') getStudents() { return this.universeService.getStudents(); }
  @Post('students') createStudent(@Body() data: any) { return this.universeService.createStudent(data); }
  @Patch('students/:id') updateStudent(@Param('id') id: string, @Body() data: any) { return this.universeService.updateStudent(id, data); }
  @Delete('students/:id') deleteStudent(@Param('id') id: string) { return this.universeService.deleteStudent(id); }
}
