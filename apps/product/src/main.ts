import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as dotenv from "dotenv";
import { ValidationPipe } from '@nestjs/common';
import { SharedService } from '@app/shared';
import { ProductModule } from './product.module';

async function bootstrap() {
  const configService=new ConfigService();
  const sharedService=new SharedService();
  dotenv.config();
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (ProductModule,sharedService.createMicroservice(configService.get("PRODUCT_QUEUE")));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  console.log("MicroService is running!");
}

bootstrap();
