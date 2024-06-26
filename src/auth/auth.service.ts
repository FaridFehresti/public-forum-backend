import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ) {}
    async validateUser(email:string , password:string):Promise<any>{
        const user = await this.userService.findUserByEmail(email);
        if(user && await bcrypt.compare(password, user.password)){
            const {password, ...result} = user;
            return result;
        }
        return null
    }
    async login(user:any){
        const payload = {email:user.email, sub:user.id};
        return {
            access_token:this.jwtService.sign(payload)
        }
    }
    async validateUserByJwt(payload: { sub: number }): Promise<any> {
        return this.userService.findUserById(payload.sub);
    }
}
