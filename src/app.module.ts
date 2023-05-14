import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizenModule } from './citizen/modules/citizen.module';
import { typeOrmConfig } from './config/typeorm.config';
import { AllUsersSignUpForm } from './Data/allusers.signupform';
import { DoctorModule } from './doctor/doctormodule.module';
//import { AdminEmployeeModule } from './Modules/AdminEmployee.module';
import { AdminModule } from './Modules/adminmodule.module';
import { EmployeeModule2 } from './Modules/employee2module.module';
import {EmployeeModule } from './Modules/employee.module';
import { BlogModule } from './Blog/blogmodule.module';
import { ServeStaticModule } from '@nestjs/serve-static';
//import { DoctorEntity } from './doctor/doctorentity.entity';


@Module({
  imports: [CitizenModule,AdminModule,AllUsersSignUpForm,EmployeeModule2,EmployeeModule,BlogModule,DoctorModule,
          TypeOrmModule.forRoot({type: 'postgres',
          host: 'containers-us-west-2.railway.app',
          port: 6942,
          username: 'postgres',
          password: 'qxCmXlXi6gN4t8OEoVZM',
          database: 'railway',
          autoLoadEntities: true,
          synchronize: true,})
        ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
