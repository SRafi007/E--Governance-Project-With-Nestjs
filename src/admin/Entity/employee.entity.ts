import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdminEntity } from "./adminentity.entity";

@Entity('employee')
export class EmployeeEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => AdminEntity, (admin) => admin.employees, { onDelete: "CASCADE" })
    admin: AdminEntity;
}