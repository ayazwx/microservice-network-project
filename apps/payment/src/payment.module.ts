import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'orm.config';
import * as dotenv from "dotenv";
import { UserEntity } from 'apps/auth/src/Entity/UserEntity.entity';
import { ProductEntity } from 'apps/product/src/Entity/product.entity';
import { ProductService } from 'apps/product/src/product.service';
import { AuthService } from 'apps/auth/src/auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([UserEntity,ProductEntity]),ClientsModule.register([{name:"AUTH_SERVICE",transport:Transport.RMQ,options:{queue:process.env.AUTH_QUEUE,urls:[`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`]}},{name:"PRODUCT_SERVICE",transport:Transport.RMQ,options:{queue:process.env.PRODUCT_QUEUE,urls:[`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`]}}])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
