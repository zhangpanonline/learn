import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 初始化 PostgreSQL 连接
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nest_redis',
      entities: [__dirname + '/**/*.entity.{.ts, .js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ShoppingCartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
