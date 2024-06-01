import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import * as dotenv from "dotenv";
import { AuthModule } from 'apps/auth/src/auth.module';
import { ProductModule } from 'apps/product/src/product.module';
import { PaymentModule } from 'apps/payment/src/payment.module';

dotenv.config();

@Module({
  imports:[ClientsModule.register([{name:"AUTH_SERVICE",transport:Transport.RMQ,options:{queue:process.env.AUTH_QUEUE,urls:[`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`]}},{name:"PRODUCT_SERVICE",transport:Transport.RMQ,options:{queue:process.env.PRODUCT_QUEUE,urls:[`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`]}},{name:"PAYMENT_SERVICE",transport:Transport.RMQ,options:{queue:process.env.PAYMENT_QUEUE,urls:[`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`]}}]),AuthModule,ProductModule,PaymentModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
