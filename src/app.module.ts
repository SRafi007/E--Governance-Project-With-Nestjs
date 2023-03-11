import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizenModule } from './citizen/modules/citizen.module';
import { typeOrmConfig } from './config/typeorm.config';
import { DoctorModule } from './doctor/doctormodule.module';
import { EmployeeModule } from './employee/employeemodule.module';

@Module({
  imports: [CitizenModule,EmployeeModule,DoctorModule,
          TypeOrmModule.forRoot({type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'psql2424',
          database: 'Practice',
          autoLoadEntities: true,
          synchronize: true,})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
