import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT') || 8000;

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Backend Assessment API')
    .setDescription('API documentation for the Backend Assessment project')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(port);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
