import { UserEntity } from "apps/auth/src/Entity/UserEntity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:"productName"})
    productName:string;

    @Column({nullable:true})
    description:string;

    @Column({name:"price"})
    price:number;

    @Column({name:"userId"})
    userId:number;

    @Column({name:"buyerId",nullable:true})
    buyerId:number;

    @Column({name:"isActive",default:true})
    isActive:boolean;

    @ManyToOne(()=>UserEntity,(user)=>user.products,{onDelete:"CASCADE"})
    @JoinColumn({name:"userId"})
    user:UserEntity;

    @ManyToOne(()=>UserEntity,(user)=>user.BuyingProducts,{onDelete:"SET NULL"})
    buyer:UserEntity;
}