import { Injectable } from '@nestjs/common';
import { PostBody,ExamTrendBody } from './app.dto';
import { HttpService } from '@nestjs/axios';
import {stringify} from 'qs';
@Injectable()
export class AppService {
  constructor(private readonly httpService:HttpService){}
  getHello(): string {
    return 'Hello World!';
  }
  getExamTrendChartViewDetails(data:ExamTrendBody){
    return this.httpService.post('http://172.16.10.13:1234/dataStatistics/ExamTrendChartViewDetails',stringify(data))
  }
}
