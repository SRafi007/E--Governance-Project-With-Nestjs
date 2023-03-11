import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class DoctorForm {   
   

   @IsNotEmpty()
    name: string;

   @IsEmail() 
    email: string;

   @Length(3,8)
    password: string;

   //  @IsNotEmpty()
   //  collage: string;

   //  @IsNotEmpty()
   //  campaign: string; 

   //  @IsNotEmpty()
   //  age: number;

   //  @IsNotEmpty()
   //  speaciality: string;

    @IsNotEmpty()
    address: string;
    
   //  @IsNotEmpty()
   //  blog: string;

    @IsNotEmpty()
    employee:number;

     //filename:string;



}