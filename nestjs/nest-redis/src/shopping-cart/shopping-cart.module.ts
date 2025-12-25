import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { RedisModule } from 'src/redis/redis.module';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  imports: [RedisModule, TypeOrmModule.forFeature([ShoppingCart])],
})
export class ShoppingCartModule {}
