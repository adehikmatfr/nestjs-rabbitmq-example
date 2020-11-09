import { NestFactory, NestApplication } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  let app: NestApplication & NestExpressApplication;
  app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // swegger setup
  const options = new DocumentBuilder()
    .setTitle('test Rabbit Message')
    .setDescription('rabbitmq test send queque')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const server = await app.listen(3200);
  console.log('=========== server runing in port 3200========');
  server.timeout = 1000 * 60 * 10;

  return app;
}
