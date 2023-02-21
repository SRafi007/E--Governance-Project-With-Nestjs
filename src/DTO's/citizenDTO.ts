import { IsNotEmpty,IsNumber,MaxLength,MinLength,Length,IsEmail } from "class-validator";
export class CitizenDTO{
    @IsNotEmpty({message:"Please Enter Id"})
    @IsNumber()
    id:Number;
    @IsNotEmpty({message:"Please Enter Your Name"})
    name:string;
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    @MaxLength(13,{message:"NID should not contain more than 13 characters"})
    @MinLength(10,{message:"NID should contain more than 9 characters"})
    nid:string;
    @Length(11,11,{message:"Please check your phone number"})
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    phoneNumber:string;
    @IsEmail()
    email:string;
}
export class CitizenLoginDTO{
    @IsNotEmpty({message:"Please Enter Your Name"})
    name:string;
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    @MaxLength(13,{message:"NID should not contain more than 13 characters"})
    @MinLength(10,{message:"NID should contain more than 9 characters"})
    nid:string;
}
export class CitizenSignupDTO{
    @IsNotEmpty({message:"Please Enter Your Name"})
    name:string;
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    @MaxLength(13,{message:"NID should not contain more than 13 characters"})
    @MinLength(10,{message:"NID should contain more than 9 characters"})
    nid:string;
    @Length(11,11,{message:"Please check your phone number"})
    @IsNotEmpty({message:"Please Enter Your Nid Number"})
    phoneNumber:string;
    @IsEmail()
    email:string;
}