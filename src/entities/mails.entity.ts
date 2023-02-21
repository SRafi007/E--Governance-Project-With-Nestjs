import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, } from "typeorm";
//import { Citizen } from "./citizens.entity";

@Entity('mails')
export class Mail  {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type: 'varchar'})
    senderMail:string;
    @Column({type: 'varchar'})
    message:string;
    @Column({type: 'varchar'})
    receiverMail:string;
}