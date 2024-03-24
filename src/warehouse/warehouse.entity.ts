// import { ManagerEntity } from "src/manager/manager.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { noticeEntity } from "./notice.entity";


@Entity("warehouse")
export class WarehouseEntity {

    @PrimaryGeneratedColumn()
    warehouseId: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;


    @Column({ type: 'varchar' })
    password: string;
    @Column({ name: 'fulName', type: 'varchar', length: 150 })
    name: string;
    @Column()
    address: string;
    @Column()
    filename: string;


    @OneToMany(() => noticeEntity, notice => notice.warehouse, { cascade: true })
    notices: noticeEntity[];

}