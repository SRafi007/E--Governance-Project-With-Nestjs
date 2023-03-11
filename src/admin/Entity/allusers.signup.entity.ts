import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity("allUser")
export class AllUsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    gender: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    profilepic: string; //file

    @Column()
    DOB: string;

    @Column()
    phonenumber: string;

}
    //salary: number;
    

//   @OneToMany(() => EmployeeEntity, (employee) => employee.admin)
//     employees: EmployeeEntity[];

    