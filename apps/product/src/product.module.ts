import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './Entity/product.entity';
import config from 'orm.config';
import { UserEntity } from 'apps/auth/src/Entity/UserEntity.entity';

@Module({
  imports: [TypeOrmModule.forRoot(config),TypeOrmModule.forFeature([ProductEntity,UserEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
