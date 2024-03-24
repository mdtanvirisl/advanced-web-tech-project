import { Optional } from "@nestjs/common";
import { IsEmail, IsInt, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class WarehouseDTO {
    @Optional()
    warehouseId: string;

    @IsNotEmpty({ message: 'Please enter a valid name' })
    @IsString()
    //@Matches(/^[^\d]+$/, { message: 'Name field should not contain any numbers' })
    @Matches(/^[A-Za-z]+$/, { message: 'Name field should contain only alphabetic character' })
    name: string;

    @IsNotEmpty({ message: 'enter a valid email address' })
    @IsEmail({}, { message: 'Invalid email format' })
    @MaxLength(30, { message: 'Email must be at most 30 characters long' })
    @MinLength(10, { message: 'Email must be at least 20 characters long' })
    @Matches(/.*@.*\.com$/, { message: 'Email must contain @, ., com' })
    email: string;

    @IsNotEmpty({ message: 'enter a valid username' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'enter a valid password' })
    @IsString()
    @Matches(/.*[0-9].*/, { message: 'Password must contain one of the numeric character' })
    @Matches(/[#@\$&]/, { message: 'Password must contain one of the special characters (@ or # or $ or &)' })
    password: string;

    @IsNotEmpty({ message: 'enter your address' })
    @IsString()
    address: string;
    @Optional()
    filename: string;

    @Optional()
    notices: any;

    // @Optional()
    // address: any;
}

export class loginDTO {
    @IsEmail() email: string;
    @IsNotEmpty() password: string;
}