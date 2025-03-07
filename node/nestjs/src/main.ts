import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false, // 默认情况下，如果在创建应用程序时发生了任何错误，应用程序会退出并返回错误代码 1。设置为 false可以抛出错误
  });
  await app.listen(9527);
}
bootstrap();
