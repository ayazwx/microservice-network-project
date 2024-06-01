import { UserEntity } from "apps/auth/src/Entity/UserEntity.entity";
import { ProductEntity } from "apps/product/src/Entity/product.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as dotenv from "dotenv";

dotenv.config();

const config:PostgresConnectionOptions={
    type:"postgres",
    host:"localhost",
    username:`${process.env.POSTGRES_USER}`,
    password:`${process.env.POSTGRES_PASSWORD}`,
    port:5432,
    entities:[UserEntity,ProductEntity],
    synchronize:true
}

export default config;