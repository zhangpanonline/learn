import { Module } from '@nestjs/common';
import { createClient } from 'redis';

const createRedisClient = () => {
  // 注册客户端
  return createClient({
    username: 'default',
    password: '95sXjpiVVBWWBLEGjJrB8nOC6aFLO1Eg',
    socket: {
      host: 'redis-13396.crce264.ap-east-1-1.ec2.cloud.redislabs.com',
      port: 13396,
    },
    // 建立连接
  }).connect();
};

@Module({
  providers: [
    {
      // 定义一个 token 为 NEST_REDIS 的依赖项
      provide: 'NEST_REDIS',
      // useFactory 属性定义一个工厂方法，用于创建并返回 Redis 客户端实例
      useFactory: createRedisClient,
    },
  ],
  // 将 Redis 客户端导出，使其成为可以在其他模块中使用的共享对象
  exports: ['NEST_REDIS'],
})
export class RedisModule {}
