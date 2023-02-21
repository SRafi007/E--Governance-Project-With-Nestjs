import { Injectable } from "@nestjs/common";
import { MailDTO, sentMailDTO } from "src/DTO's/mailDTO";
import { CitizenDTO } from "src/DTO's/citizenDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Citizen } from "src/entities/citizens.entity";
import { Repository } from "typeorm";
import { Mail } from "src/entities/mails.entity";

@Injectable()
export class MailService {
    
    constructor(
                @InjectRepository(Mail)
                private mailRepo: Repository<Mail>,
    ){}


    private dammyCitizenData=[{id:1,name:"citizen1",nid:1234567890001,phoneNumber:"01790084943",email:"citizen1@gmail.com"},
                                     {id:2,name:"citizen2",nid:1234567890002,phoneNumber:"01790084943",email:"citizen1@gmail.com"},
                                     {id:3,name:"citizen3",nid:1234567890003,phoneNumber:"01790084943",email:"citizen1@gmail.com"}]

    private dammyMails=[{id:1, senderMail:"1@gmail.com",message:"Hello there",receiverMail:"2@gmail.com"},
                        {id:2, senderMail:"2@gmail.com",message:"Hello there",receiverMail:"3@gmail.com"}]

    private myMails=[];
    private dammyID:number=1;


getCitizenData(){
    return this.dammyCitizenData;
}

citizenProfile(id){
    const info=this.dammyCitizenData.find(id=>id);
    if(!info){
        return "Please enter A Valid Id";
    }
    else{
        return info;
    }
}


sendMail(mail:sentMailDTO){

    this.mailRepo.save(mail);
    return "Sent";
}
mailbox(mailAddress) {
    const mails=this.mailRepo.findOneBy({senderMail:mailAddress.add})
    if(mails){
        return mails;
    }
    else {
        return "Your Mail box is empty";
    }
    
}
deleteMail(id: any) {
    this.mailRepo.delete({id:id});
    return "Deleted";
}

getMailData(){
    return this.mailRepo.find();
}


}