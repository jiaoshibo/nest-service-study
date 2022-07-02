import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

// 主路径 /app
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 匹配 http://localhost:port/app/get-list
  @Get("get-list")
  getList(){
    return 'app-get-list'
  }
  @Post("post-list")
  postList(){
    return 'app-post-list'
  }


  // 通配符 ?+* http://localhost:port/user_xxx
  @Get("user_*")
  getUser(){
    return 'getUser'
  }

  // http://localhost:port/putName/xxx
  @Put("putName/:id")
  getUserName(){
    return 'put user name'
  }
}
