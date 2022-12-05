import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFilter } from '@/infrastructure/common/filter/exception.filter';
import {
  ResponseFormat,
  ResponseInterceptor,
} from '@/infrastructure/common/interceptors/reponse.interceptor';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalFilters(new AllExceptionFilter());

  app.useGlobalInterceptors(new ResponseInterceptor());

  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Connectabil Test API')
      .setDescription('API for Connectabil Test')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
