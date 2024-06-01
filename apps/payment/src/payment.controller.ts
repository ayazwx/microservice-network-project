import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { BuyProductDto } from './dto/BuyProduct.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,
  ) {}

  @MessagePattern({cmd:"buy-product"})
  async buyProduct(@Payload() buyProductDto:BuyProductDto){
    return await this.paymentService.buyProduct(buyProductDto);
  }
}
