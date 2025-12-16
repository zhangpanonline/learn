import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    createUserDto.createTime = createUserDto.updateTime = new Date();
    await this.userRepository
      .createQueryBuilder('u')
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
  }

  async findAll() {
    return await this.userRepository.createQueryBuilder('u').getMany();
  }

  async findOne(id: number) {
    return await this.userRepository
      .createQueryBuilder('u')
      .where('u.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.updateTime = new Date();
    return await this.userRepository
      .createQueryBuilder('u')
      .update(User)
      .set(updateUserDto)
      .where('u.id = :id', { id })
      .execute();
  }

  async remove(id: number) {
    return await this.userRepository
      .createQueryBuilder('u')
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
