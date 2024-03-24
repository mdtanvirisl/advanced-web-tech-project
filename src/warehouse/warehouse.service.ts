import { Injectable } from "@nestjs/common";
import { WarehouseEntity } from "./warehouse.entity";
import { loginDTO } from "./warehouse.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class WarehouseService {
    constructor(@InjectRepository(WarehouseEntity)
    private warehouseRepo: Repository<WarehouseEntity>,
        private jwtService: JwtService

    ) { }
    async addAdmin(myobj: WarehouseEntity): Promise<WarehouseEntity> {
        return await this.warehouseRepo.save(myobj);
    }
    async findOne(logindata: loginDTO): Promise<any> {
        return await this.warehouseRepo.findOneBy({ email: logindata.email });
    }
    async getWhStaff(): Promise<WarehouseEntity[]> {
        return await this.warehouseRepo.find();
    }
    async findOneByUsername(username: string): Promise<WarehouseEntity> {
        return this.warehouseRepo.findOne({
            where: { username: username },
        });
    }
    async showProfile(username: string): Promise<WarehouseEntity> {
        return await this.warehouseRepo.findOneBy({ username: username });
    }
    getNotification(): string {
        return "Welcome to 3rd route service of staff";
    }
    async remove(username: number): Promise<void> {
        await this.warehouseRepo.delete(username);
    }
    getOrderByNameAndId(name, id): object {
        console.log(id, name);
        return { message: "your id is " + id + " and your name is " + name };
    }
    addPacking(myobj: object): object {
        console.log(myobj);
        return myobj;

    }
    getUsers(): object {
        return { message: "hellow Admin" }
    }
    getUsersById(id: string): object {
        return { message: "You id is " + id };
    }
    getUsersByNameAndId(name: string, id: string): object {
        return {
            message: "You id is " + name +
                " and your id is " + id
        };

    }

    async getAllAdmins(): Promise<WarehouseEntity[]> {
        return this.warehouseRepo.find({ relations: ['managers'] });
    }

    // async addManager(adminId: string, manager: ManagerEntity): Promise<ManagerEntity> {
    //     console.log(adminId);
    //     console.log(manager);
    //     const admin = await this.adminRepo.findOneBy({ adminId: adminId });
    //     manager.admin = admin;
    //     return this.managerRepo.save(manager);
    // }

    async search(logindata: loginDTO): Promise<WarehouseEntity> {
        return await this.warehouseRepo.findOneBy({ email: logindata.email });
    }
}