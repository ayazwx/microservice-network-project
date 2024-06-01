import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './Entity/UserEntity.entity';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv";
import { LocalStrategy } from './Strategies/local.strategy';
import { JwtStrategy } from './Strategies/jwt.strategy';
import config from 'orm.config';
import { ProductEntity } from 'apps/product/src/Entity/product.entity';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([UserEntity,ProductEntity]),JwtModule.register({secret:`${process.env.JWT_SECRET}`,signOptions:{expiresIn:"1h"}})],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {};
