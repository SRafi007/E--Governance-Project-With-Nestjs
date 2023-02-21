import {Entity,PrimaryGeneratedColumn,Column, } from 'typeorm';
@Entity('citizens')
//import {Mail} from './mails.entity';
export class Citizen  {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: 'varchar'})
    name:string;
    @Column({type: 'varchar'})
    nid:string;
    @Column({type: 'varchar'})
    phoneNumber:string;
    @Column({type: 'varchar'})
    email:string;
}
