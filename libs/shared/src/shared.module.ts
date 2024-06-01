import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[ConfigModule.forRoot({isGlobal:true,envFilePath:".env "}),ClientsModule.registerAsync([{
    imports:[ConfigModule],inject:[ConfigService],name:"AUTH_SERVICE",useFactory:(configService:ConfigService)=>({
      transport:Transport.RMQ,options:{queue:configService.get("AUTH_QUEUE"),urls:[`amqp://${configService.get("RABBITMQ_DEFAULT_USER")}:${configService.get("RABBITMQ_DEFAULT_PASS")}@localhost:5672`]}
    })
  }])],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
}
