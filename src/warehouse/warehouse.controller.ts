import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { AuthGuard } from "./Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { WarehouseDTO } from "./warehouse.dto";
import { WarehouseEntity } from "./warehouse.entity";
import { SessionGuard } from "./session.guard";


@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService) { }

    @UseGuards(AuthGuard)
    @Get()
    getUsers(): object {
        return this.warehouseService.getUsers();
    }

    @UseGuards(SessionGuard)
    @Get('/dashboard')
    getWarehouse(): object {
        try {
            return this.warehouseService.getWhStaff();
        }
        catch {
            return { error: 'invalid' };
        }
    }
    @UseGuards(SessionGuard)
    @Get('/viewprofile')
    showProfile(@Session() session): object {
        try {
            return this.warehouseService.showProfile(session.username);
        }
        catch {
            throw new InternalServerErrorException("Failed to show profile");
        }
    }

    @UseGuards(SessionGuard)
    @Put('/update/:id')
    updateUsersById(@Param('id') id: number): object {
        try {
            return this.warehouseService.remove(id);
        } catch {
            throw new InternalServerErrorException("Failed to update profile");
        }
    }

    @UseGuards(SessionGuard)
    @Delete('/delete/:id')
    deleteUserbyId(@Param('id') id: number): object {
        try {
            return this.warehouseService.remove(id);

        } catch {
            throw new InternalServerErrorException("Failed to delete profile");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/notice')
    getNotification(): string {
        try {
            return this.warehouseService.getNotification();

        } catch {
            throw new InternalServerErrorException("Failed to show notice");
        }
    }

    @UseGuards(SessionGuard)
    @Get('/order')
    getOrderByNameAndId(@Query('name') name: string, @Query('id') id: string): object {
        try {
            return this.warehouseService.getOrderByNameAndId(name, id);

        } catch {
            throw new InternalServerErrorException("Failed to show order");
        }
    }

    @UseGuards(SessionGuard)
    @Post('/packing')
    addPacking(@Body() myobj: object): object {
        console.log(myobj);
        return this.warehouseService.addPacking(myobj);
    }

    @Get('Stock_Movement/:id')
    getUsersById(@Param('id') id: string): object {
        return this.warehouseService.getUsersById(id);
    }

    @Get('Quality_Control/')
    getUsersByNameAndId(@Query('name') name: string,
        @Query('id') id: string): object {
        return this.warehouseService.getUsersByNameAndId(name, id);
    }

    @Post('addstaff')
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
        myobj.filename = myfile.filename;
        return this.warehouseService.addAdmin(myobj);
    }

    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }

    @Get('/getstaff')
    getAllAdmin(): Promise<WarehouseEntity[]> {
        return this.warehouseService.getAllAdmins();
    }

};