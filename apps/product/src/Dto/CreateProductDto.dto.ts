import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto{
    @IsString()
    productName:string;

    @IsString()
    @MinLength(25)
    @IsOptional()
    description?:string;

    @IsBoolean()
    @IsOptional()
    isActive?:boolean;

    @IsNumber()
    price:number;

    @IsNumber()
    userId:number;

    @IsNumber()
    @IsOptional()
    buyerId?:number;
}