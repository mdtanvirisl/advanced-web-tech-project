import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { WarehouseService } from '../warehouse.service';
import { WarehouseDTO, loginDTO } from '../warehouse.dto';

@Injectable()
export class AuthService {
    constructor(
        private warehouseService: WarehouseService,
        private jwtService: JwtService
    ) { }
    async signUp(myobj: WarehouseDTO): Promise<WarehouseDTO> {
        return await this.warehouseService.addAdmin(myobj);
    }
    async signIn(logindata: loginDTO): Promise<{ access_token: string }> {
        const user = await this.warehouseService.findOne(logindata);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async login(logindata: loginDTO) {
        const seller = await this.warehouseService.searchSeller(logindata);
        const result = await bcrypt.compare(logindata.password, seller.password);
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
}