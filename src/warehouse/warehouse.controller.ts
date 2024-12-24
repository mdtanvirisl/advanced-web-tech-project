import { Body, Controller, Delete, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query, Res, Session, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";
import { AuthGuard } from "./Auth/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { UpdateStaffDTO, WarehouseDTO } from "./warehouse.dto";
import { WarehouseEntity } from "./warehouse.entity";
import { SessionGuard } from "./session.guard";
import { ProductDTO, UpdateDTO } from "./product.dto";


@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService) { }

    @UseGuards(AuthGuard)
    @Get()
    getUsers(): object {
        return this.warehouseService.getUsers();
    }

    // @UseGuards(SessionGuard)
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

    @Put('/update_profile/:username')
    updateProfile(@Param('username') username: string, @Body() UpdateInfo: UpdateStaffDTO): object {
        try {
            return this.warehouseService.updateProfile(username, UpdateInfo);
        }
        catch {
            throw new InternalServerErrorException("Failed to update profile");
        }

    }

    @Get('getusers/:email')
    getUsersByEmail(@Param('email') email: string): object {
        return this.warehouseService.getUsersByEmail(email);
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
    @Get('/search_staff')
    searchCustomer(@Query() query: { name: string }): object {
        const { name } = query;
        try {
            return this.warehouseService.searchCustomer(name);
        }
        catch {
            throw new InternalServerErrorException("Failed to search");
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
    @Post('addproduct')
    @UseInterceptors(FileInterceptor('productPic',
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
    addProduct(@Body() myobj: ProductDTO, @UploadedFile() myfile: Express.Multer.File): object {
        myobj.filename = myfile.filename;
        try {
            return this.warehouseService.addProduct(myobj);
        }
        catch {
            throw new InternalServerErrorException("Failed to add product");
        }
    }

    @UseGuards(SessionGuard)
    @Put('/update_product/:id')
    @UseInterceptors(FileInterceptor('productPic',
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
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() UpdateProduct: UpdateDTO, @UploadedFile() myfile: Express.Multer.File): object {
        UpdateProduct.filename = myfile.filename;
        try {
            return this.warehouseService.updateProduct(id, UpdateProduct);
        }
        catch {
            throw new InternalServerErrorException("Failed to update product");
        }
    }

    // @UseGuards(SessionGuard)
    @Get('/show_all_product')
    showAllProduct(): object {
        try {
            return this.warehouseService.showAllProduct();
        }
        catch {
            throw new InternalServerErrorException("Failed to show all product");
        }
    }

    // @UseGuards(SessionGuard)
    @Get('/search_product_name')
    searchProduct(@Query() query: { name: string }): object {
        const { name } = query;
        try {
            return this.warehouseService.searchProduct(name);
        }
        catch {
            throw new InternalServerErrorException("Failed to search");
        }
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