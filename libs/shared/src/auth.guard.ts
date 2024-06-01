import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(@Inject("AUTH_SERVICE") private readonly authService:ClientProxy){}
    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request:Request=context.switchToHttp().getRequest();
        
        const token=request.headers["token"];

        if(!token){
            throw new UnauthorizedException();
        }

        try{
            const verifiedToken=await this.authService.send({cmd:"verifyToken"},token).toPromise();
            if(verifiedToken){
                return true;
            }
            throw new UnauthorizedException();
        }catch(err){
            throw new UnauthorizedException();
        }
    }
}