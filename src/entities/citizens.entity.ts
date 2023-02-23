import {Entity,PrimaryGeneratedColumn,Column,OneToMany } from 'typeorm';
import { CitizenHistory } from './history.entity';
import { Mail } from './mails.entity';
@Entity('citizens')
//import {Mail} from './mails.entity';
export class Citizen  {
    [x: string]: any;
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
    @OneToMany(()=>Mail, (mails)=>mails.citizen)
    mails:Mail[];
    @OneToMany(()=>CitizenHistory,(history)=>history.citizen)
    history:CitizenHistory[];
}
