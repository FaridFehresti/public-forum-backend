import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){

    }
    async getUsers(){
        return this.prisma.user.findMany();
    }
    async findUserByEmail(email:string, password:string){
        return this.prisma.user.findUnique({where:{email}})
    }
    async createUser(email:string , password:string){
        const hashedPassword = await bcrypt.hash(password, 10)

        return this.prisma.user.create({
            data:{
                email,
                password:hashedPassword
            }
        })
    }
    async validateUser(email:string, password:string): Promise<any>{
        const user  =  await this.findUserByEmail(email, password);
        if(user && await bcrypt.compare(password, user.password)){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
