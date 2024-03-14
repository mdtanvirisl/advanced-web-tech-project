import { Module } from "@nestjs/common";
import { User2Controller } from "./user2.controller";
import { User2Service } from "./user2.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";



@Module({
    imports: [TypeOrmModule.forFeature([User]),],
    controllers: [User2Controller],
    providers: [User2Service],
})

export class User2Module { };