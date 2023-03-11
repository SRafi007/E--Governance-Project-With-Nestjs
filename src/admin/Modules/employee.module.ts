import { AdminEntity } from './../Entity/adminentity.entity';
import { EmployeeController } from '../Controller/employee.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeeEntity } from 'src/admin/Entity/employee.entity';
import { EmployeeService } from 'src/admin/Services/employee.service';
import { AllUsersEntity } from 'src/admin/Entity/allusers.signup.entity';
// import { ManagerService } from "src/manager/manager.service";
// import { ManagerEntity } from "src/manager/manager.entity";


@Module({
imports: [TypeOrmModule.forFeature([EmployeeEntity,AdminEntity,AllUsersEntity])],
controllers: [EmployeeController],
providers: [EmployeeService],

})

export class EmployeeModule {}