import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){

    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(){
        return this.userService.getUsers();
    }
    @Post()
    async createUser(@Body() body:{email:string; password:string}){
        return this.userService.createUser(body.email, body.password);
    }
}
