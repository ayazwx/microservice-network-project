import { PartialType } from "@nestjs/mapped-types";
import { ProductEntity } from "../Entity/product.entity";

export class UpdateProductDto extends PartialType(ProductEntity){};