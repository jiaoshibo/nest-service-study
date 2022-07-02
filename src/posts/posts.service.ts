import { Injectable,HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository,Repository } from 'typeorm';

import { PostsEntity } from './posts.entity';

export interface PostsRo{
  list:PostsEntity[];
  count:number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository:Repository<PostsEntity>
  ){}

  /**
   * 创建文章
   * @param post 
   */
  async create(post:Partial<PostsEntity>){
    const {title} = post;
    if(!title){
      throw new HttpException('缺少文章标',401)
    }
    const doc = await this.postsRepository.findOne({where:{title}})
    if(doc){
      throw new HttpException('文章已存在',401);
    }
    return await this.postsRepository.save(post);
  }
  
  /**
   * 获取文章列表 
   */
  async findAll(query):Promise<PostsRo>{
    const db = getRepository(PostsEntity).createQueryBuilder('post');
    db.where('1 = 1');
    db.orderBy('posts.create_time','DESC');

    const count = await db.getCount();
    const {pageNum=1,pageSize=10,...params} = query;

    db.limit(pageSize);
    db.offset(pageSize*(pageNum-1));

    const posts = await db.getMany();
    return {list:posts,count:count}
  }

  /**
   * 获取指定文章
   */
  async findById(id):Promise<PostsEntity>{
    return await this.postsRepository.findOne(id)
  }

  /**
   * 更新文章
   */
   async updateById(id, post): Promise<PostsEntity> {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  /**
   * 删除文章
   */
   async remove(id) {
    const existPost = await this.postsRepository.findOne(id);
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
  }
}
