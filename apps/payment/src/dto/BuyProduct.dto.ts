import { IsNumber } from "class-validator";

export class BuyProductDto{
    @IsNumber()
    product_id:number;

    @IsNumber()
    user_id:number;
}