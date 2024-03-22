import { Body, Controller, Post, UsePipes, UseInterceptors, UploadedFile, ValidationPipe, Session, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { WarehouseDTO, loginDTO } from '../warehouse.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: WarehouseDTO, @UploadedFile() myfile: Express.Multer.File): Promise<WarehouseDTO> {
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(myobj.password, salt);
        myobj.password = hashedpassword;
        myobj.filename = myfile.filename;
        return this.authService.signUp(myobj);
    }
    // @Post('login')
    // signIn(@Body() logindata: loginDTO) {
    //     return this.authService.signIn(logindata);
    // }

    @Post('login')
    @UsePipes(new ValidationPipe)
    async login(@Body() logindata: loginDTO, @Session() session) {

        const result = await this.authService.login(logindata);
        if (result) {
            session.email = logindata.email;
            console.log(session.email);

            return true;
        }
        else {
            throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);
        }
    }
}