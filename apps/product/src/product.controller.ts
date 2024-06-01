import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './Dto/CreateProductDto.dto';
import { ProductEntity } from './Entity/product.entity';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({cmd:"create-product"})
  async createProduct(@Payload() createProductDto:CreateProductDto){
    return await this.productService.createProduct(createProductDto);
  }

  @MessagePattern({cmd:"save-product"})
  async saveProduct(@Payload() product){
    return await this.productService.saveProduct(product);
  }

  @MessagePattern({cmd:"find-product-by-id"})
  async findProductById(@Payload() product_id:number):Promise<ProductEntity>{
    return await this.productService.findOneProductById(product_id);
  }

  @MessagePattern({cmd:"find-products-byuserid"})
  async findProductsByUserId(@Payload() userId:number){
    return await this.productService.findAllProductByUserId(userId);
  }

  @MessagePattern({cmd:"findall-products"})
  async findAllProducts(){
    return await this.productService.findAllProducts();
  }

  @MessagePattern({cmd:"delete-product"})
  async deleteProduct(@Payload() productId:number){
    return await this.productService.deleteProduct(productId);
  }

  @MessagePattern({cmd:"update-product"})
  async updateProduct(@Payload() data){
    return await this.productService.updateProduct(data);
  }
}
