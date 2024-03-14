import { IsEmail, IsInt, IsString, Matches } from "class-validator";

export class user2DTO {
    @IsString()
    fullName: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    gender: string;
    @IsInt()
    phone: number;
}