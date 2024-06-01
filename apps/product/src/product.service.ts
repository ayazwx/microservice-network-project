import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './Entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './Dto/CreateProductDto.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>){};

  async createProduct(createProductDto:CreateProductDto){
    return await this.productRepository.save(createProductDto);
  }

  async saveProduct(product:ProductEntity){
    return await this.productRepository.save(product);
  }

  async findAllProductByUserId(userId:number){
    return await this.productRepository.find({where:{userId:userId},relations:{user:true}});
  }

  async findOneProductById(product_id:number){
    return await this.productRepository.findOne({where:{id:product_id}});
  }

  async findAllProducts(){
    return await this.productRepository.find({relations:{user:true}});
  }

  async deleteProduct(productId:number){
    return await this.productRepository.delete(productId);
  }

  async updateProduct(data){
    const {product_id,updateProductDto}=data;
    return await this.productRepository.update(product_id,updateProductDto);
  }
}
