import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";





@Entity("order")
export class OrderEntity {

    @PrimaryGeneratedColumn()
    productId: number;


    @Column({ type: 'varchar', unique: true })
    productCode: string;

    @Column({ name: 'fullName', type: 'varchar', length: 150, unique: true })
    productName: string;

    @Column({ name: 'fullName', type: 'varchar', length: 150, unique: true })
    customerName: string;

    @Column({ name: 'fullName', type: 'varchar', length: 150, unique: true })
    address: string;

    @Column()
    productQuantity: number;

    @Column()
    productPrice: number;

}