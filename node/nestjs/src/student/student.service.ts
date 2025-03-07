import { Injectable } from '@nestjs/common';
import { Student } from './interfaces/student.interface';

@Injectable()
export class StudentService {
  private readonly students: Student[] = [];

  create(student: Student) {
    this.students.push(student);
  }

  findAll(): Student[] {
    return this.students;
  }
}
