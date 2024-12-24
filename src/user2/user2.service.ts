import { Injectable } from "@nestjs/common";
import { user2DTO } from "./user2.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Like, Repository } from "typeorm";


@Injectable()
export class User2Service {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) { }

    async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async findByFullName(substring: string): Promise<User[]> {
        return this.userRepository.find({
            where: { fullName: Like(`%${substring}%`) },
        });
    }

    async findOneByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({
            where: { username: username },
        });
    }

    async remove(username: number): Promise<void> {
        await this.userRepository.delete(username);
    }

    async addUser(myObj: user2DTO): Promise<user2DTO> {
        return myObj;
    }

}