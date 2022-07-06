import { Injectable } from '@nestjs/common';
import { ExamTrendBody } from './app.dto';
import { HttpService } from '@nestjs/axios';
import * as qs from 'qs';
import {map} from 'rxjs';
@Injectable()
export class AppService {
  constructor(private readonly httpService:HttpService){}
  getHello(): string {
    return 'Hello World!';
  }
  getExamTrendChartViewDetails(data:ExamTrendBody){
    // let _data = Qs.stringify(data);
    return this.httpService.post('http://172.16.10.13:7006/dataStatistics/ExamTrendChartViewDetails',qs.stringify(data)).pipe(map(res=>res.data))
  }
}
