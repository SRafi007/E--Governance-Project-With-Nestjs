import{Entity,Column,PrimaryGeneratedColumn,OneToOne} from 'typeorm';
@Entity('citizenBios')
export class CitizenBio{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    address: string;
  
    @Column({ nullable: true })
    bloodGroups: string;
  
    @Column({ nullable: true })
    familyMembers: number;
  
    @Column({ nullable: true })
    maritalStatus: boolean;
  
    @Column({ nullable: true })
    jobDes: string;
  
    @Column({ nullable: true })
    postoffice: string;
}