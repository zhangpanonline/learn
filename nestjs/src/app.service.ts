import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '这是一个 nestjs 搭建的 web 服务器';
  }
}
