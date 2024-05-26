import { JwtAuthGuard } from 'src/auth/jwt-auth.gaurd';
import { UserService } from './user.service';
import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { IUserData } from './user-data.interfaces';

@Controller('')
export class UserController {
    constructor(private readonly userService:UserService){

    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getUser(){
        return this.userService.getUsers();
    }
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createUser(@Body()createUserDto: IUserData){

        return this.userService.createUser(createUserDto);
    }
}
