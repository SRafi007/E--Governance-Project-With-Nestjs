import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { doctorController } from "./doctor.controller";
import { DoctorService } from "./doctorservice.service";
import { DoctorEntity } from "./doctorentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { BlogService } from "src/Blog/blogservice.service";
import { BlogEntity } from "src/Blog/blogentity.entity";


@Module({
imports: [MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
               port: 465,
               ignoreTLS: true,
               secure: true,
               auth: {
                   user: 'globalnews421@gmail.com',
                   pass: 'fixabtecmsvjdfbz'
               },
              }
  }), TypeOrmModule.forFeature([DoctorEntity,BlogEntity])],
controllers: [doctorController],
providers: [DoctorService,BlogService]

})

export class DoctorModule {}