import { Injectable } from "@nestjs/common";
import { MailDTO, sentMailDTO } from "src/DTO's/mailDTO";
import { CitizenBioDTO, CitizenDTO, CitizenHistoryDTO, CitizenLoginDTO, CitizenSignupDTO, FeedbackDTO } from "src/DTO's/citizenDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Citizen } from "src/entities/citizens.entity";
import { Repository } from "typeorm";
import { Mail } from "src/entities/mails.entity";
import { MailService } from "./mail.service";
import { CitizenBio } from "src/entities/citizenBio.entity";
import * as tf from '@tensorflow/tfjs';
import * as bcrypt from 'bcrypt';
import session from "express-session";
import { Feedback } from "src/entities/feedback.entity";
import { CitizenHistory } from "src/entities/history.entity";
import * as fs from 'fs';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Campagin } from "src/entities/campagin.entity";




@Injectable()
export class CitizenService {

    
    constructor(
                @InjectRepository(Citizen)
                private citizenRepo: Repository<Citizen>,
                @InjectRepository(Mail)
                private mailRepo: Repository<Mail>,
                @InjectRepository(CitizenBio)
                private citizenBioRepo: Repository<CitizenBio>,
                @InjectRepository(Feedback)
                private feedbackRepo: Repository<Feedback>,
                @InjectRepository(CitizenHistory)
                private historiesRepo: Repository<CitizenHistory>,
                @InjectRepository(Campagin)
                private campaignRepo: Repository<Campagin>
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
                                        mails:true,
                                        bio:true
                                    },
                                    });

    return info;
}

async updateBio(bio:CitizenBioDTO,id:any){
    const tempdata=await this.citizenBioRepo.update({citizenId:id},
                                {address:bio.address,
                                bloodGroup:bio.bloodGroup,
                                age:bio.age,
                                gender:bio.gender,
                                familyMembers:bio.familyMembers,
                                maritalStatus:bio.maritalStatus,
                                jobDes:bio.jobDes,
                                postoffice:bio.postoffice,
                                photoName:bio.photoName,
                                //citizenId:id
                                })
    if(tempdata.affected==0){
        await this.citizenBioRepo.save(
            {address:bio.address,
            bloodGroup:bio.bloodGroup,
            age:bio.age,
            gender:bio.gender,
            familyMembers:bio.familyMembers,
            maritalStatus:bio.maritalStatus,
            jobDes:bio.jobDes,
            postoffice:bio.postoffice,
            citizenId:id,
            photoName:bio.photoName,
            })
            return "Bio added"
    }
    else{
        return "Bio Updated"
    }


    
}
deleteCitizen(id:number){
    return this.citizenRepo.delete({id:id});
}

getHistory(id:number){
    return this.citizenRepo.find({where: {id:id},
                                relations:{
                                    history:true,
                                },                       
    })
}

async addFeedback(feedback:FeedbackDTO){
    await this.feedbackRepo.save(feedback);
    if(await this.feedbackRepo.save(feedback)){
        let newActivity:CitizenHistoryDTO;
        newActivity={des:"You gave Feed back to Our site",citizenId:feedback.citizenId}
        
        this.historiesRepo.save(newActivity);
        return 1;
    }
    else{
        return 0;
    }
}
async displayFeedback(){
    const tempdata=await this.feedbackRepo.find()
    if(tempdata){
        return tempdata
    }
    else{
        return 0;
    }
    //return await this.feedbackRepo.find();
}

async printIDCard(){
    
    const tempdata=await this.citizenRepo.find();
    // Define the content of the PDF document using pdfmake syntax
    const docDefinition = {
        content: [
          { text: 'User Profile for'+""},
          { text: 'Name: ' + ""},
          { text: 'Email: ' + "" },
          { text: 'Age: ' +"" },
          { text: 'Address: ' + "" }
        ],
        styles: {
            header: {
                font: 'Roboto'
            }
        }
      };
      const fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    }
};
  
      // Generate the PDF document
      const pdf = pdfmake.createPdf(docDefinition);
  
      // Write the PDF document to a file
      await pdf.getStream().pipe(fs.createWriteStream('./userPDF/user-profile.pdf'));
      return tempdata;
}
//----------------------------------------------
async getCampaign(){
    const tempdata = await this.campaignRepo.find();
    if(tempdata)
    {
        return tempdata;
    }
    else{
        return " unsuccessful";
    }
}


}
