import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WarehouseEntity } from "./warehouse.entity";

@Entity("notice")
export class noticeEntity {

    @PrimaryGeneratedColumn()
    noticeId: number;

    @Column({ name: 'notice', type: 'varchar', length: 250, unique: true })
    notice: string;

    @ManyToOne(() => WarehouseEntity, warehouse => warehouse.notices)
    warehouse: WarehouseEntity;
}