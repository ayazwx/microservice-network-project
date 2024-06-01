import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

@Injectable()
export class SharedService {

    createMicroservice(queue):RmqOptions{

        return {
            transport:Transport.RMQ,
            options:{
                urls:[`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@localhost:5672`],
                queue:queue
            }
        }
    }

}
