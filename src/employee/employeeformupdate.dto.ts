import { IsNotEmpty, IsInt, Length } from "class-validator";

export class EmployeeFormUpdate {   
   
   @Length(3,8)
    name: string;



}
