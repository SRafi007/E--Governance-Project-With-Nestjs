import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Campagin } from "src/entities/campagin.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
//import { MailerService } from "@nestjs-modules/mailer/dist";
import { EmployeeEntity } from "./employeeentity.entity";
import { CreateCampaignDto, EmployeeForm } from "./employeeform.dto";
import { EmployeeFormUpdate } from "./employeeformupdate.dto";
@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(EmployeeEntity)
        private employeeRepo: Repository<EmployeeEntity>,
        @InjectRepository(Campagin)
        private campaginRepo: Repository<Campagin>
        //private mailerService: MailerService
      
        ) {}

getIndex():any { 
    return this.employeeRepo.find();

}
getUserByID(id):any {
    return this.employeeRepo.findOneBy({ id });
}

getUserByIDName(qry):any {
    return this.employeeRepo.findOneBy({ id:qry.id,name:qry.name });
}

// insertUser(mydto:EmployeeForm):any {
//     const employeeaccount = new EmployeeEntity()
//     employeeaccount.name = mydto.name;
//     employeeaccount.email = mydto.email;
//     employeeaccount.password = mydto.password;
//     employeeaccount.address = mydto.address;
   

//    return this.employeeRepo.save(employeeaccount);
//     //    return this.employeeRepo.save(mydto);
//       }

insertUser(mydto:EmployeeForm):any {
                const employeeaccount = new EmployeeForm
                employeeaccount.name = mydto.name;
                employeeaccount.email = mydto.email;
                employeeaccount.password = mydto.password;
                employeeaccount.address = mydto.address;
                employeeaccount.age = mydto.age;
                employeeaccount.rank= mydto.rank;
                employeeaccount.campaign= mydto.campaign;
                employeeaccount.phonenumber= mydto.phonenumber;
                employeeaccount.salary= mydto.salary;
                employeeaccount.doctorrating= mydto.doctorrating;
                employeeaccount.filename=mydto.filename;
               //return this.employeeRepo.save(employeeaccount);
                  return this.employeeRepo.save(mydto);
                  }
          
updatetuserInfo(mydto,id):any {
    const employeeaccount = new EmployeeForm
    employeeaccount.name = mydto.name;
    employeeaccount.email = mydto.email;
    employeeaccount.password = mydto.password;
    employeeaccount.address = mydto.address;
    employeeaccount.age = mydto.age;
    employeeaccount.rank= mydto.rank;
    employeeaccount.campaign= mydto.campaign;
    employeeaccount.phonenumber= mydto.phonenumber;
    employeeaccount.salary= mydto.salary;
    employeeaccount.doctorrating= mydto.doctorrating;
   //return this.employeeRepo.save(employeeaccount);
      return this.employeeRepo.update({id:id},{
        name : mydto.name,
        email : mydto.email,
        password : mydto.password,
        address : mydto.address,
        age : mydto.age,
        rank: mydto.rank,
        campaign: mydto.campaign,
        phonenumber: mydto.phonenumber,
        salary: mydto.salary,
      doctorrating: mydto.doctorrating,      
      });
      }  
updateUser(name,email):any {
   
    return this.employeeRepo.update({email:email},{name:name});
    }
updateUserbyid(mydto:EmployeeFormUpdate,id):any {
    return this.employeeRepo.update(id,mydto);
       }
    deleteUserbyid(id):any {
    
        return this.employeeRepo.delete(id);
    }
    
    getDoctorsByemployeeID(id):any {
        return this.employeeRepo.find({ 
                where: {id:id},
            relations: {
                doctors: true,
            },
         });
    }
    getHistory(id:number){
        return this.employeeRepo.find({where: {id:id},
        relations:{
        history:true,
        },  
        })
        }
    addCampaign(campaign:CreateCampaignDto){
        // let tempdata:CreateCampaignDto;
        // tempdata={
        //     title: campaign.title,
        //     des:campaign.des,
        //     campaignDate:campaign.campaignDate,
        //     place:campaign.place,
        //     type: campaign.type,
        //     employeManagmentId:campaign.employeManagmentId
        // }
        const mydto = this.campaginRepo.save({
            title: campaign.title,
            des:campaign.des,
            campaginInfo:campaign.campaginInfo,
            place:campaign.place,
            type: campaign.type
        });
        if (mydto){
            return mydto;
        }
        else {
            return 0;
        }
    }
    
async signup(mydto) {
const salt = await bcrypt.genSalt();
const hassedpassed = await bcrypt.hash(mydto.password, salt);
mydto.password= hassedpassed;
return this.employeeRepo.save(mydto);
}

async signin(mydto):Promise<any>{
    console.log(mydto.password);
const mydata= await this.employeeRepo.findOneBy({email: mydto.email});
const isMatch= await bcrypt.compare(mydto.password, mydata.password);
if(isMatch) {
return 1;
}
else {
    return 0;
}
}

// async sendEmail(mydata){
//  return   await this.mailerService.sendMail({
//         to: mydata.email,
//         subject: mydata.subject,
//         text: mydata.text, 
//       });

// }



}
