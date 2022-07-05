import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import envConfig from '../config/env';
import { ConfigModule } from '@nestjs/config';
import { connection } from '../config/connectionDatabase';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[envConfig.path]
    }),
    connection()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
