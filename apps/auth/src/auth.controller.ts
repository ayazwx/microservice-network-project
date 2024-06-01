import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/CreateUserDto.dto';
import { ExistingUserDto } from './dto/ExistingUserDto.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({cmd:"register"})
  async register(@Payload() createUserDto:CreateUserDto){
    return await this.authService.register(createUserDto);
  }

  @MessagePattern({cmd:"login"})
  async login(@Payload() existingUserDto:ExistingUserDto){
    return await this.authService.login(existingUserDto);
  }

  @MessagePattern({cmd:"verifyToken"})
  async verifyToken(@Payload() token){
    return await this.authService.verifyJwt(token);
  }

  @MessagePattern({cmd:"findallUsers"})
  async findAllUsers(){
    return await this.authService.findallUsers();
  }

  @MessagePattern({cmd:"find-user-by-id"})
  async findUserById(@Payload() userId:number){
    return await this.authService.findOneUserById(userId);
  }

  @MessagePattern({cmd:"save-user"})
  async saveUser(@Payload() user){
    return await this.authService.saveUser(user);
  }

  @MessagePattern({cmd:"delete-user"})
  async deleteUser(@Payload() userId:number){
    return await this.authService.deleteAUser(userId);
  } 

  @MessagePattern({cmd:"update-user"})
  async updateUser(@Payload() data){
    return await this.authService.updateUser(data);
  }
}
