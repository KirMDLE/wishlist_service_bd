import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,     
      forbidNonWhitelisted: true, 
      transform: true,      
    }),
  );
  app.setGlobalPrefix('api');

  app.enableCors();

   // Swagger documentation
   const config = new DocumentBuilder()
   .setTitle('Your API')
   .setDescription('API documentation')
   .setVersion('1.0')
   .addBearerAuth()
   .build();
 const document = SwaggerModule.createDocument(app, config);
 const configService = app.get(ConfigService);

 SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}

bootstrap();
