import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/auth/src/dto/CreateUserDto.dto';
import { ExistingUserDto } from 'apps/auth/src/dto/ExistingUserDto.dto';
import { JwtAuthGuard } from '@app/shared/auth.guard';
import { LocalGuard } from 'apps/auth/src/Guards/local.guard';
import { CreateProductDto } from 'apps/product/src/Dto/CreateProductDto.dto';
import { BuyProductDto } from 'apps/payment/src/dto/BuyProduct.dto';
import { UpdateUserDto } from 'apps/auth/src/dto/UpdateUserDto.dto';
import { UpdateProductDto } from 'apps/product/src/Dto/updateProductDto.dto';

@Controller()
export class ApiController {
  constructor(@Inject("AUTH_SERVICE") private readonly authService:ClientProxy,
  @Inject("PRODUCT_SERVICE") private readonly productService:ClientProxy,
  @Inject("PAYMENT_SERVICE") private readonly paymentService:ClientProxy) {}

  @Post("/register")
  async register(@Body() createUserDto:CreateUserDto){
    return await this.authService.send({cmd:"register"},createUserDto).toPromise();
  }


  @UseGuards(LocalGuard)
  @Post("/login")
  async login(@Body() existingUserDto:ExistingUserDto){
    return await this.authService.send({cmd:"login"},existingUserDto).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/user/findall")
  async findAllUsers(){
    return await this.authService.send({cmd:"findallUsers"},{}).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/user/delete/:id")
  async deleteAUserByItsId(@Param("id") id:number){
    return await this.authService.send({cmd:"delete-user"},id).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Put("/user/update/:user_id")
  async updateUser(@Param("user_id") user_id:number,@Body() updateUserDto:UpdateUserDto){
    return await this.authService.send({cmd:"update-user"},{user_id,updateUserDto}).toPromise();
  }


  @UseGuards(JwtAuthGuard)
  @Post("/product/create")
  async createProduct(@Body() createProductDto:CreateProductDto){
    return await this.productService.send({cmd:"create-product"},createProductDto).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/product/findByUserIds/:id")
  async findProductsByUserId(@Param("id") id:number){
    return await this.productService.send({cmd:"find-products-byuserid"},id).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/product/findall")
  async findAllProducts(){
    return await this.productService.send({cmd:"findall-products"},{}).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/product/delete/:id")
  async deleteAProductByItsId(@Param("id") id:number){
    return await this.productService.send({cmd:"delete-product"},id).toPromise();
  }

  @UseGuards(JwtAuthGuard)
  @Put("/product/update/:product_id")
  async updateProduct(@Param("product_id") product_id,@Body() updateProductDto:UpdateProductDto){
    return await this.productService.send({cmd:"update-product"},{product_id,updateProductDto});
  }

  @UseGuards(JwtAuthGuard)
  @Post("/buyProduct")
  async buyProduct(@Body() buyProductDto:BuyProductDto){
    return await this.paymentService.send({cmd:"buy-product"},buyProductDto).toPromise();
  }
}
