import { MailService } from './../Services/mail.service';
import { AllUsersEntity } from '../Entity/allusers.signup.entity';
//import { EmployeeService } from 'src/admin/Services/employee.service';
import {EmployeeService} from  'src/employee/employeeservice.service';
//import { EmployeeEntity } from 'src/admin/Entity/employee.entity';
import { EmployeeEntity } from 'src/employee/employeeentity.entity';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/admin/Entity/adminentity.entity";
import { AdminController } from "../Controller/admin.controller"
import { AdminService } from "../Services/adminservice.service"
import { MailerModule } from '@nestjs-modules/mailer';
// import { ManagerService } from "src/manager/manager.service";
// import { ManagerEntity } from "src/manager/manager.entity";


@Module({
imports: [MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
                   port: 465,
                   ignoreTLS: true,
                   secure: true,
                   auth: {
                       user: 'islammasayekh@gmail.com',
                       pass: 'cvlvaspowjlvdxvu'
                   },
                  }
      }),TypeOrmModule.forFeature([AdminEntity,EmployeeEntity,AllUsersEntity])],
controllers: [AdminController],
providers: [AdminService,EmployeeService,MailService],

})

export class AdminModule {}