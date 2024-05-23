import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){

    }
    async findUserByEmail(email: string): Promise<{email:string , password:string, id:number} | null> {
        return this.prisma.user.findUnique({
          where: { email },
        });
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
    async getUsers(): Promise<{email:string , password:string, id:number}[]> {
        return this.prisma.user.findMany();
      }
    
}
