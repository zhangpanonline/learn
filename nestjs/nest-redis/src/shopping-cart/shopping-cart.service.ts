import { Injectable, Inject } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import type { RedisClientType } from 'redis';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartService {
  @Inject('NEST_REDIS')
  private redisClient: RedisClientType;
  @InjectRepository(ShoppingCart)
  private shoppingCartRepository: Repository<ShoppingCart>;

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    // 保存到 db 中
    await this.shoppingCartRepository.save(createShoppingCartDto);
    // 更新 redis 缓存
    await this.redisClient.set(
      `cart:${createShoppingCartDto.userId}`,
      JSON.stringify(createShoppingCartDto),
      {
        EX: 30,
      },
    );
    return {
      msg: '添加成功！',
      success: true,
    };
  }

  async findOne(id: number): Promise<ShoppingCart | null> {
    // 先从 Redis 中查询缓存，没有再查 db
    const data = await this.redisClient.get(`cart:${id}`);
    const cartEntity = data ? (JSON.parse(data) as ShoppingCart) : null;
    if (cartEntity) return cartEntity;
    return await this.shoppingCartRepository.findOne({
      where: {
        userId: id,
      },
    });
  }

  async update(updateShoppingCartDto: UpdateShoppingCartDto) {
    const { userId, cartData } = updateShoppingCartDto;
    const count = cartData!.count;
    // 查询数据
    const cartEntity = (await this.findOne(userId as number)) as ShoppingCart;
    const cart = cartEntity ? cartEntity.cartData : {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const quality = (cart.count || 0) + count;
    // 更新 count
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    cart.count = quality;

    // 更新 db 数据
    await this.shoppingCartRepository.update({ userId }, cartEntity);
    // 更新 Redis 缓存
    await this.redisClient.set(`cart:${userId}`, JSON.stringify(cartEntity), {
      EX: 30,
    });
    return {
      msg: '更新成功！',
      success: true,
    };
  }
}
