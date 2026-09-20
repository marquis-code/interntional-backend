import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001', // admin panel
      'http://localhost:3002', // interntional-website
      'http://localhost:3003', // universe-website
      process.env.FRONTEND_URL || 'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  app.use(compression());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
