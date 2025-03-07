import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateStudentDto } from './student.dot';
import { StudentService } from './student.service';
// import { Student } from './interfaces/student.interface';

@Controller('api/student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }
}
