import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置全局路由前缀
  app.setGlobalPrefix('nest');
  app.enableCors();

  const config = new DocumentBuilder().setTitle('nest 服务').setDescription('nest service').setVersion('0.1.0').addBearerAuth().build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('docs',app,document);
  await app.listen(8089);
}
bootstrap();
