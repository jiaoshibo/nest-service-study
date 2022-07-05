import { ApiProperty } from '@nestjs/swagger';

export class PostBody {
  @ApiProperty({description:'用户名'})
  readonly userName:string;
}


export class ExamTrendBody{
  readonly examPaperRecordId:string;
  readonly pageNum:number;
  readonly pageSize:number;
  readonly paperId:string;
}