import { Injectable } from "@nestjs/common";
import { MailDTO, sentMailDTO } from "src/DTO's/mailDTO";
import { CitizenDTO, CitizenLoginDTO, CitizenSignupDTO } from "src/DTO's/citizenDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Citizen } from "src/entities/citizens.entity";
import { Repository } from "typeorm";
import { Mail } from "src/entities/mails.entity";
import { MailService } from "./mail.service";
import { CitizenBio } from "src/entities/citizenBio.entity";

@Injectable()
export class CitizenService {

    
    constructor(
                @InjectRepository(Citizen)
                private citizenRepo: Repository<Citizen>,
                @InjectRepository(Mail)
                private mailRepo: Repository<Mail>,
                @InjectRepository(CitizenBio)
                private citizenBioRepo: Repository<CitizenBio>
    ){}


getCitizenData(){
    return this.citizenRepo.find({relations:["mails"],});
}
async citigenSignup(citizen){
    const tempdata=await this.citizenRepo.findOneBy({nid:citizen.nid});
    if(tempdata)
    {
        return " This NID already have an account";
    }
    else{
    this.citizenRepo.save(citizen);
    return "done";
    }     
}
updateProfile(profile: CitizenSignupDTO) {
    //this.citizenRepo.update({nid:profile.nid},{name:profile.name, phoneNumber:profile.phoneNumber,email:profile.email})
    return "updated";
}

async citizenProfile(id){
    const info=await this.citizenRepo.find({where:{id:id},
                                    relations:{
                                        mails:true
                                    },
                                    });

    return info;
}

async updateBio(bio:any,id:number){
    const tempdata=await this.citizenBioRepo.update({id:id},
                                {address:bio.address,
                               
                                familyMembers:bio.familyMembers,
                                maritalStatus:bio.maritalStatus,
                                jobDes:bio.jobDes,
                                postoffice:bio.postOffice
                                })
    return "Bio Edited"
}

getHistory(id:number){
    return this.citizenRepo.find({where: {id:id},
                                relations:{
                                    history:true,
                                },                       
    })
}

}