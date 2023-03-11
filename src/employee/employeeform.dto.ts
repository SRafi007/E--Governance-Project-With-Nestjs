import { IsNotEmpty, IsInt, Length, IsEmail,IsOptional } from "class-validator";

export class EmployeeForm {   
   
       @IsNotEmpty()
        name: string;
       
       @IsEmail() 
        email: string;
    
        @Length(3,18)
        password: string;
    
        @IsNotEmpty()
        address: string;
    
       
        age: number;
    
        @IsNotEmpty()
         rank: string;
         
         @IsNotEmpty()
         campaign: string;
    
         @Length(3-12)
         phonenumber: number;
    
         
         salary: number;
    
         @Length(5)
         doctorrating: string;
         filename:string;
      //  @IsNotEmpty()
        //  question: string;
    
        //  @IsNotEmpty()
        //  answer: string;
    
      }


export class CreateCampaignDto {
    @IsNotEmpty()
    title: string;
  
    @IsNotEmpty()
    des: string;
  
    @IsNotEmpty()
    campaginInfo:string;
    @IsNotEmpty()
    place: string;
  

    @IsNotEmpty()
    type: string;
  }

 export class EmployeeHistoryDTO{
    des:string;
    employeeId:number;

}