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
import { join } from 'path';
//import { DoctorEntity } from './doctor/doctorentity.entity';


@Module({
  imports: [CitizenModule,AdminModule,AllUsersSignUpForm,EmployeeModule2,EmployeeModule,BlogModule,DoctorModule,
          TypeOrmModule.forRoot({type: 'postgres',
          host: 'containers-us-west-95.railway.app',
          port: 7231,
          username: 'postgres',
          password: 'q17wx1B97dhvne5vAJZW',
          database: 'railway',
          autoLoadEntities: true,
          synchronize: true,}), ServeStaticModule.forRoot({
            rootPath: join (__dirname, '..', '../public'), // added ../ to get one folder back
            serveRoot: '/public/' //last slash was important
          }),
        ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
