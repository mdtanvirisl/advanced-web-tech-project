import { Injectable } from "@nestjs/common";
import { WarehouseEntity } from "./warehouse.entity";
import { loginDTO } from "./warehouse.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class WarehouseService {
    constructor(@InjectRepository(WarehouseEntity)
    private adminRepo: Repository<WarehouseEntity>,
        private jwtService: JwtService

    ) { }
    async addAdmin(myobj: WarehouseEntity): Promise<WarehouseEntity> {
        return await this.adminRepo.save(myobj);
    }
    async findOne(logindata: loginDTO): Promise<any> {
        return await this.adminRepo.findOneBy({ email: logindata.email });
    }
    getWhStaff(): string {
        return "Welcome to 1st route service";
    }
    getStaff(): string {
        return "Welcome to 2nd route service of staff";
    }
    getNotification(): string {
        return "Welcome to 3rd route service of staff";
    }
    getUserById(id: number): object {
        console.log(id);
        return { message: "your id is " + id };
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
        return this.adminRepo.find({ relations: ['managers'] });
    }

    // async addManager(adminId: string, manager: ManagerEntity): Promise<ManagerEntity> {
    //     console.log(adminId);
    //     console.log(manager);
    //     const admin = await this.adminRepo.findOneBy({ adminId: adminId });
    //     manager.admin = admin;
    //     return this.managerRepo.save(manager);
    // }

    async searchSeller(logindata: loginDTO): Promise<WarehouseEntity> {
        return await this.adminRepo.findOneBy({ email: logindata.email });
    }
}