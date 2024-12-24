import { Injectable, ParseIntPipe } from "@nestjs/common";
import { WarehouseEntity } from "./warehouse.entity";
import { UpdateStaffDTO, WarehouseDTO, loginDTO } from "./warehouse.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { ProductEntity } from "./product.entity";
import { UpdateDTO } from "./product.dto";


@Injectable()
export class WarehouseService {
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>

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


    async updateProfile(username: string, UpdateInfo: UpdateStaffDTO): Promise<any> {
        await this.warehouseRepo.update({ username: username }, UpdateInfo);
        return await this.warehouseRepo.findOneBy({ username: username });
    }

    async addProduct(myobj: ProductEntity): Promise<ProductEntity> {
        return await this.productRepo.save(myobj);
    }

    async updateProduct(id: number, UpdateProduct: UpdateDTO): Promise<ProductEntity> {
        await this.productRepo.update(id, UpdateProduct);
        return await this.productRepo.findOneBy({ productId: id });
    }

    async showAllProduct(): Promise<ProductEntity[]> {
        return await this.productRepo.find();
    }

    async searchProduct(name: string): Promise<ProductEntity[]> {
        return await this.productRepo.find({
            where: {
                productName: Like(name + '%')

            },
        });
    }
    async searchCustomer(name: string): Promise<WarehouseEntity[]> {
        return await this.warehouseRepo.find({
            where: {
                name: Like(name + '%')
            },
        });
    }
    async getUsersByEmail(email: string): Promise<WarehouseEntity> {
        return await this.warehouseRepo.findOne({
            where: {
                email: email,
            }
        });
    }
    getNotification(): string {
        return "Welcome to 3rd route service of staff";
    }

    async updateOrder(id: number, warehouseDTO: WarehouseDTO): Promise<WarehouseEntity> {
        await this.warehouseRepo.update(id, warehouseDTO);
        return this.getOrderById(id);
    }
    async getOrderById(id: number): Promise<WarehouseEntity> {
        const idString = id.toString();
        return this.warehouseRepo.findOneBy({ warehouseId: idString });
    }
    async remove(id: number): Promise<void> {
        await this.warehouseRepo.delete(id);
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