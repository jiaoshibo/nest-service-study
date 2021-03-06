import { Body, Controller, Get, HttpCode, Ip, Param, Post, Query} from '@nestjs/common';
import { AppService } from './app.service';

import { PostBody,ExamTrendBody } from './app.dto';
import { ApiOperation, ApiTags} from '@nestjs/swagger';

// 主路径 /app
@ApiTags('ApiTags')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiOperation({summary:'hello world'})
  @Get()
  getHello(@Query('id') id): string {
    console.log(`查询字符串：id=${id}`);
    
    return this.appService.getHello();
  }

  // /postParam/xx
  @ApiOperation({summary:'postParam'})
  @Post('postParam/:name')
  @HttpCode(200)
  paramData(@Param('name') name:string){
    console.log(name);
    return {
      type:'post-query',
      data:name
    }
  }

  @ApiOperation({summary:'postBody'})
  @Post('postBody')
  bodyData(@Body() body:PostBody, @Ip() ip:string){
    console.log(body,ip);
    return {
      type:'post-body',
      data:body
    }
  }


  /**
   * 使用 http 请求调用其他后台
   * @param body 
   * @returns 
   */
  @HttpCode(200)
  @Post('examTrendChartViewDetails')
  async examTrendChartViewDetails(@Body() body:ExamTrendBody){
    let res = await this.appService.getExamTrendChartViewDetails(body).toPromise()
    console.log(new Date(),`---${JSON.stringify(res)}`)
    return res
  }
}
