import { Module } from "@nestjs/common";
import { WarehouseController } from "./warehouse.controller";
import { WarehouseService } from "./warehouse.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { WarehouseEntity } from "./warehouse.entity";
import { AuthService } from "./Auth/auth.service";
import { noticeEntity } from "./notice.entity";


@Module({
    imports: [TypeOrmModule.forFeature([WarehouseEntity, noticeEntity]),
    JwtModule.register({
        global: true,
        secret: "3NP_Backend_Warehouse",
        signOptions: { expiresIn: '30m' },
    }),
    ],
    controllers: [WarehouseController],
    providers: [WarehouseService, AuthService],
    exports: [WarehouseService],
})

export class WarehouseModule { }