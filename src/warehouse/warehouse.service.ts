import { Injectable } from "@nestjs/common";


@Injectable()
export class WarehouseService {
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
}