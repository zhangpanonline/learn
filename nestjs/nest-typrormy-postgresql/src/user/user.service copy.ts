import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // 使用 InjectEntityManager 装饰器注入了 EntityManager 实体管理器，来调用他的 API 进行增删查改操作。
  // 每次操作都要指定要处理的实体类，例如这里的User
  @InjectEntityManager()
  private manage: EntityManager;

  async create(createUserDto: CreateUserDto) {
    await this.manage.save(User, createUserDto);
  }

  async findAll() {
    return await this.manage.find(User);
  }

  async findOne(id: number) {
    return this.manage.findBy(User, { id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.manage.save(User, {
      id,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.manage.delete(User, { id });
  }
}
