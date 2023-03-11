import { AllUsersEntity } from 'src/admin/Entity/allusers.signup.entity';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { adminRepository } from "../Repository/admin.repository";
import { AdminForm } from "../Data/adminformupdate.dto";
import { AdminFormUpdate } from "../Data/adminmodule.dto";
import { AdminEntity } from "src/admin/Entity/adminentity.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class MailService {
    // constructor(
    //     @InjectRepository(AdminEntity)
    //     private adminRepo: Repository<AdminEntity>,
    // ) { }
    
    constructor(@InjectRepository(AllUsersEntity)
    //private adminRepo: adminRepository,
    private mailerService: MailerService
) { }


    async send(mydata){
    return  await this.mailerService.sendMail({
        to: mydata.email,
        subject: mydata.subject,
        text: mydata.text, 
      });

}

}
    
