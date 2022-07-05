// 使用 typeorm 连接数据库


import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from '../src/posts/posts.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';

/**
 * 连接数据库
 */
export const connection = ()=>{
  return TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:async (configService:ConfigService)=>({
      type:'mysql',
      entities:[PostsEntity],
      host:configService.get('DB_HOST','lcoalhost'),
      port: configService.get<number>('DB_PORT', 3306), // 端口号
      username: configService.get('DB_USER', 'root'),   // 用户名
      password: configService.get('DB_PASSWORD', '123456'), // 密码
      database: configService.get('DB_DATABASE', 'blog'), //数据库名
      timezone: '+08:00', //服务器上配置的时区
      synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
    })
  })
}