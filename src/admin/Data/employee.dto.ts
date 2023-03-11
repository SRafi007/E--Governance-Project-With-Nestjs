import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class EmployeeForm{
    //validation cols

    @IsNotEmpty()
    name: string; 

    @IsEmail()
    @Matches(/@/,{message: 'email not valid'})
    email: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    adminId: number;
}