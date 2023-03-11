import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeController } from "./employee.controller"
import { EmployeeService } from "./employeeservice.service"
import { DoctorService } from "src/doctor/doctorRes/doctor.service";
import { DoctorEntity } from "src/doctor/doctorRes/doctor.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmployeeEntity } from "./employeeentity.entity";
 import { EmployeeHistory } from "./history.entity";
import { Campagin } from "src/entities/campagin.entity";


@Module({
imports: [
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'your email address',
                       pass: 'your app password'
                   },
                  }
      }),
      
    TypeOrmModule.forFeature([EmployeeEntity,
         EmployeeHistory,
        DoctorEntity,Campagin])],
controllers: [EmployeeController],
providers: [EmployeeService,DoctorService],

})

export class EmployeeModule {}
