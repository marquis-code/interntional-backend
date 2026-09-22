import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v1');
  
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  app.use(compression());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
