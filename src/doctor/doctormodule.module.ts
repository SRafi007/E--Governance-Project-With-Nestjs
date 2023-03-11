import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { doctorController } from "./doctor.controller";
import { DoctorService } from "./doctorservice.service";
import { DoctorEntity } from "./doctorentity.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
imports: [MailerModule.forRoot({
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
  }), TypeOrmModule.forFeature([DoctorEntity])],
controllers: [doctorController],
providers: [DoctorService]

})

export class DoctorModule {}