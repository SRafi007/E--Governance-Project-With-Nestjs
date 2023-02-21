import { Injectable } from "@nestjs/common";


@Injectable()
export class LoginService{
    
    private dammyCitizenLoginData=[{name:"citizen1",nid:"1234567890000"},
                                    {name:"citizen2",nid:"1234567890001"},
                                    {name:"citizen3",nid:"1234567890002"}]


    
    uname:string;
    citizenLogin(citizen){
        const citizenData=this.dammyCitizenLoginData.find(e=>e.name==citizen.name && e.nid==citizen.nid)
        if(!citizenData){return "UserName Or Password Invalid"}
        else{    
            return "Login Successful"}
        
    }
    citigenSignup(citizen){
        const citizenData=this.dammyCitizenLoginData.find(e=>e.nid==citizen.nid);
        if(!citizenData){
            let newCitizenInfo={name:citizen.name, nid:citizen.nid};
            this.dammyCitizenLoginData.push(newCitizenInfo);
            return "Signup Successful";
        }
        else{
            return "this NID already have an account";
        }
        
    }

    citizenCount(){
        return this.dammyCitizenLoginData.length;
    }
}