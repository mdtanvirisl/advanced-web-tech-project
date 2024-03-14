import { Controller, Get, Param, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";




@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    @Get('/profile')
    getAdmin(): string {
        return this.adminService.getAdmin();
    }
    @Get('/users/:id')
    getUsersById(@Param('id') id: number): object {
        return this.adminService.getUserByName(id);
    }
    @Get('/users')
    getUsersByNameAndId(@Query('name') name: string, @Query('id') id: string): object {
        return this.adminService.getUserByNameAndId(name, id);
    }
}