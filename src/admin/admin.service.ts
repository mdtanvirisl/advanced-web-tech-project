import { Injectable } from "@nestjs/common";


@Injectable()
export class AdminService {
    getAdmin(): string {
        return "Welcome Admin";
    }
    getUserByName(id: number): object {
        console.log(id);
        return { message: "your id is " + id };
    }
    getUserByNameAndId(name, id): object {
        console.log(id, name);
        return { message: "your id is " + id + " and your name is " + name };
    }
}