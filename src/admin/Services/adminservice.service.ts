import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { adminRepository } from "../Repository/admin.repository";
import { AdminForm } from "../Data/adminformupdate.dto";
import { AdminFormUpdate } from "../Data/adminmodule.dto";
import { AdminEntity } from "src/admin/Entity/adminentity.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";


@Injectable()
export class AdminService {
    // constructor(
    //     @InjectRepository(AdminEntity)
    //     private adminRepo: Repository<AdminEntity>,
    // ) { }
    
    constructor(@InjectRepository(AdminEntity)
    private adminRepo: adminRepository,
    private mailerService: MailerService
) { }

getIndex():any { 
    return this.adminRepo.find();

}
getUserByID(id):any {
    return this.adminRepo.findOneBy({ id });
}

getUsersfindByName(name):any{
    return this.adminRepo.find(name);
}

getUserByIDName(qry):any {
    return this.adminRepo.findOneBy({ id:qry.id,name:qry.name });
}

insertUser(mydto:AdminForm):any {
    const adminaccount = new AdminEntity()
    adminaccount.name = mydto.name;
    adminaccount.email = mydto.email;
    adminaccount.password = mydto.password;
    adminaccount.salary = mydto.salary;

    return this.adminRepo.save(adminaccount);
      }

updateUser(name,id):any {
    console.log(name+id);
    return this.adminRepo.update(id,{name:name});
    }
updateUserbyid(mydto:AdminFormUpdate,id):any {
    return "Updated "+this.adminRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.adminRepo.delete(id);
    }
    
    

    getEmpUsingAdminID(id): any{
        return this.adminRepo.find({
            where: { id: id },
            relations: {
                employees: true
            },
        });

    }
    


    getallNames(){
        return this.adminRepo.find({
    select: {
        name: true,
    },
})
    }

    getallEmails(){
        return this.adminRepo.find({
    select: {
        email:true
    },
})
    }

    getallNumbers() {
        //return this.adminRepo.sum
        return this.adminRepo.count({
            select: {
                salary: true
            },
        })
    }

    getAdminByName(name:string) {
    return this.adminRepo.findBy({name});
    }

    async sendEmail(mydata){
    return  await this.mailerService.sendMail({
        to: mydata.email,
        subject: mydata.subject,
        text: mydata.text, 
      });

}

}
    
