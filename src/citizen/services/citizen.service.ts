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
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
import { createObjectCsvWriter } from 'csv-writer';
import { CitizenMedicalData } from "src/entities/citizenMedicalReport.entity";




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
                private campaignRepo: Repository<Campagin>,
                @InjectRepository(CitizenMedicalData)
                private medicalDataRepo: Repository<CitizenMedicalData>
    ){}


getCitizenData(){
    return this.citizenRepo.find({relations:["mails"],});
}
async citigenSignup(citizen){
    const tempdata=await this.citizenRepo.findOneBy({nid:citizen.nid});
    if(tempdata)
    {
        return 0;
    }
    else{
    
    this.citizenRepo.save(citizen);
    return 1;
    }     
}
async updateProfile(profile:any,id) {
    
    if(await this.citizenRepo.update({id:id},{name:profile.name, phoneNumber:profile.phoneNumber,email:profile.email})){
        return 1;
    }
    else{
    return 0;
    }
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
            photoName:"",
            })
            return "Bio added"
    }
    else{
        return "Bio Updated"
    }


    
}
async updatePhoto(bio:any,id:any){
    const tempdata=await this.citizenBioRepo.update({citizenId:id},
                                {
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
        return "Bio - Updated"
    }
}

async getBio(id:any){
    const tempdata=await this.citizenBioRepo.findOneBy({citizenId:id})

        return tempdata;


    
}
async getUserPhoto(id:any){
    const tempdata=await this.citizenBioRepo.findOneBy({citizenId:id})
    if(tempdata){
        if(tempdata.photoName!==undefined)
        { return tempdata.photoName;}
        else{ return "user_icon.jpg"}
    }
    else{
        return "user_icon.jpg"
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
    let newArr=[];
    const tempdata=await this.feedbackRepo.find()
    if(tempdata){
        let i=0;
        for (i=0;i<tempdata.length;i++){
            let photoname=await this.getUserPhoto(tempdata[i].citizenId)
            const newobj={id:tempdata[i].id,feedback:tempdata[i].feedback,date:tempdata[i].date,citizenId:tempdata[i].citizenId,photoname:photoname}
            newArr.push(newobj);
        }
        
        return newArr
    }
    else{
        return 0;
    }
    //return await this.feedbackRepo.find();
}

async printIDCard(id){
    // let path='citizen_'+id+'_info.txt'
    // const CSV_FILE_PATH = 'Uploads/citizenInfoPrint/'+path;
    const tempdata=await this.citizenRepo.findOneBy({id:id})
    const tempdataBio=await this.citizenBioRepo.findOneBy({citizenId:id})

    // const filename = 'user_data.txt';
    // const fileContent = JSON.stringify(tempdata);
    // const fileContentBio = JSON.stringify(tempdataBio);
    // //const fileContent = JSON.stringify(tempdata);
    // const content=fileContent+'\n'+fileContentBio;
    // //return currtime;
    // fs.writeFile(CSV_FILE_PATH, content, (err) => {
    //   if (err) {
    //     console.error(err);
    //   } else {
    //     console.log(`User data saved to ${filename}`);
        
    //   }
    // });
	const mergedData=Object.assign({}, tempdata, tempdataBio)
    return mergedData;
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
async addMedicalInfo(medicalData,id){
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(medicalData.password, salt);
    medicalData.password = hassedpassed;
    medicalData.citizenId = id;
    return this.medicalDataRepo.save(medicalData);
}
async deleteMedicalInfo(id){
    const data=await this.medicalDataRepo.delete(id);
    return data;
}
async getMyMedicalData(id,password){
    const tempdata=await this.medicalDataRepo.find({where:{citizenId:id}})
    const temppass=tempdata[0].password;
    console.log(temppass+password);
    if(tempdata){
        const isMatch= await bcrypt.compare(password, temppass);
        if(isMatch) {
            return tempdata;
            }
            else {
                return 0;
            }
    }
    else{
        return "Failed";
    }
}

async getMyMedicalDataById(id){
    const tempdata=await this.medicalDataRepo.find({where:{citizenId:id}})
    if(tempdata){
       
            return tempdata;
  
    }
    else{
        return 0;
    }
}


}
