import { ProductEntity } from "apps/product/src/Entity/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:"email",type:"varchar"})
    email:string;

    @Column({name:"username"})
    username:string;

    @Column()
    password:string;

    @Column({name:"Total_money",default:0})
    totalMoney:number;

    @OneToMany(()=>ProductEntity,(product)=>product.user)
    products:ProductEntity[];

    @OneToMany(()=>ProductEntity,(product)=>product.buyer)
    BuyingProducts:ProductEntity[];
}