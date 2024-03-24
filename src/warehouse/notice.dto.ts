import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ProductDTO {


    @Optional()
    noticeId: number;

    @IsNotEmpty({ message: 'Please enter a valid product code' })
    @IsString()
    notice: string;
}