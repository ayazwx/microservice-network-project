import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsNumber()
    @IsOptional()
    totalMoney?:number;

    @IsAlphanumeric()
    @MinLength(8)
    password:string;
}