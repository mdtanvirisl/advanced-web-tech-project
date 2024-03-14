import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user3')
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    fullName: string;

    @Column({ default: false })
    isActive: boolean;

    @BeforeInsert()
    generateId(): void {
        this.id = Math.floor(Math.random() * 1000);
    }
}