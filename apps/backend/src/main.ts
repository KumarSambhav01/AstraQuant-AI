import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '@astraquant/shared-config';
import { GlobalExceptionFilter } from './common/exceptions';
import { ResponseInterceptor } from './common/interceptors';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(
  new ResponseInterceptor(),
);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('AstraQuant AI API')
    .setDescription(
      'Production-grade AI-powered Financial Intelligence Platform API',
    )
    .setVersion('1.0.0')
    .addServer('/api')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT access token',
      },
      'JWT',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'AstraQuant AI API Docs',
  });

  await app.listen(env.PORT);

  console.log(
    `🚀 AstraQuant Backend running at http://localhost:${env.PORT}/api`,
  );

  console.log(
    `📘 Swagger Documentation: http://localhost:${env.PORT}/api/docs`,
  );
}

void bootstrap();