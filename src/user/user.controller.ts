import { UserService } from './user.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){

    }
    @Get()
    async getUser(){
        return this.userService.getUsers();
    }
    @Post()
    async createUser(@Body() body:{email:string; password:string}){
        return this.userService.createUser(body.email, body.password);
    }
}
