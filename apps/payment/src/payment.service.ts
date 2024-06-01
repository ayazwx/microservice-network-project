import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BuyProductDto } from './dto/BuyProduct.dto';

@Injectable()
export class PaymentService {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
    @Inject("PRODUCT_SERVICE") private readonly productService: ClientProxy
  ) {}

  async buyProduct(buyProductDto: BuyProductDto) {
    const { product_id, user_id } = buyProductDto;

    const product = await this.productService.send({ cmd: "find-product-by-id" }, product_id).toPromise();
    const user = await this.authService.send({ cmd: "find-user-by-id" }, user_id).toPromise();

    if (user.id === product.userId) {
      return { success: false, message: "You cannot buy your own product!" };
    }

    if (!product.isActive) {
      return { success: false, message: "Product is already sold!" };
    }

    if (user.totalMoney < product.price) {
      return { success: false, message: "You don't have enough money!" };
    }

    user.totalMoney -= product.price;
    product.isActive = false;
    product.buyerId = user.id;

    await this.productService.send({ cmd: "save-product" }, product).toPromise();
    await this.authService.send({ cmd: "save-user" }, user).toPromise();

    return { success: true, message: "Product purchased successfully!" };
  }
}
