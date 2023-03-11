
import { DoctorEntity } from 'src/doctor/doctorRes/doctor.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EmployeeHistory } from './history.entity';


@Entity("employee")
export class EmployeeEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

    @Column()
  age: number;

  @Column()
  rank: string;

  @Column()
  campaign: string;
  
  @Column()
  phonenumber: number;
  
  @Column()
  salary: number;
  
  @Column()
  doctorrating: string;

  @Column()
  filename: string;

  // @Column()
  // question: string;

  // @Column()
  // answer: string;
  

@OneToMany(() => DoctorEntity, (doctor) => doctor.employee)
  doctors: DoctorEntity[]


 @OneToMany(()=>EmployeeHistory,(history)=>history.employee)
  history:EmployeeHistory[];


}
