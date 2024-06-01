import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './Entity/UserEntity.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { ExistingUserDto } from './dto/ExistingUserDto.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly UserRepository:Repository<UserEntity>,
  private readonly jwtService:JwtService){};

  async validateUser(username:string,password:string):Promise<UserEntity>{
    const user=await this.UserRepository.findOne({where:{username:username}});
  
    if(user && await bcrypt.compare(password,user.password)){
      return user;
    }
    else{
      return null;
    }
  }
  

  async register(createUserDto:CreateUserDto){
    const {password}=createUserDto;
    const hashedPassword=await bcrypt.hash(password,10);
    return await this.UserRepository.save({...createUserDto,password:hashedPassword});
  }

  async login(existingUserDto:ExistingUserDto){
    const {username,password}=existingUserDto;

    const user=await this.validateUser(username,password);
    if(!user){
      throw new UnauthorizedException();
    }

    const payload={
      username:user.username,
      id:user.id
    }
    return await {token:await this.jwtService.sign(payload)}
  }

  async verifyJwt(token){
    if(!token){
      return false;
    }

    try{
      return await this.jwtService.verify(token);
    }
    catch(err){
      return false;
    }
  }

  async saveUser(user:UserEntity){
    return await this.UserRepository.save(user);
  }

  async findallUsers(){
    return await this.UserRepository.find({relations:{BuyingProducts:true}});
  }

  async findOneUserById(user_id:number){
    return await this.UserRepository.findOne({where:{id:user_id}});
  }

  async deleteAUser(userId:number){
    return await this.UserRepository.delete(userId);
  }

  async updateUser(data){
    const {user_id,updateUserDto}=data;
    return await this.UserRepository.update(user_id,updateUserDto);
  }

  
}
