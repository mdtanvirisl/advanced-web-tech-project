import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { WarehouseService } from "./warehouse.service";


@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService) { }
    @Get('/dashboard')
    getWarehouse(): string {
        return this.warehouseService.getWhStaff();
    }
    @Get('/viewprofile')
    getStaff(): string {
        return this.warehouseService.getStaff();
    }
    @Put('/update/:id')
    updateUsersById(@Param('id') id: number): object {
        return this.warehouseService.getUserById(id);
    }
    @Delete('/delete/:id')
    deleteUserbyId(@Param('id') id: number): object {
        return this.warehouseService.getUserById(id);
    }
    @Get('/notification')
    getNotification(): string {
        return this.warehouseService.getNotification();
    }
    @Get('/order')
    getOrderByNameAndId(@Query('name') name: string, @Query('id') id: string): object {
        return this.warehouseService.getOrderByNameAndId(name, id);
    }
    @Post('/packing')
    addPacking(@Body() myobj: object): object {
        console.log(myobj);
        return this.warehouseService.addPacking(myobj);
    }
};