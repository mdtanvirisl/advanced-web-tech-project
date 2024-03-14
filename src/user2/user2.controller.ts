import { Body, Controller, Param, Get, Post, UsePipes, ValidationPipe, Delete } from "@nestjs/common";
import { user2DTO } from "./user2.dto";
import { User2Service } from "./user2.service";
import { User } from "./user.entity";



@Controller('user2')
export class User2Controller {
    constructor(private readonly user2Service: User2Service) { }
    @Post('users')
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myObj: user2DTO): Promise<user2DTO> {
        return this.user2Service.addUser(myObj);
    }
    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return this.user2Service.create(user);
    }

    @Get('fullname/:substring')
    async getUserBySubString(@Param('substring') substring: string): Promise<User[]> {
        return this.user2Service.findByFullName(substring);
    }

    @Get('usernames/:usernames')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        return this.user2Service.findOneByUsername(username);
    }

    @Delete(':username')
    async deleteUser(@Param('username') username: string): Promise<void> {
        return this.user2Service.remove(username);
    }
}