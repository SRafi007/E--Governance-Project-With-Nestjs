import { EmployeeForm } from 'src/employee/employeeform.dto';
import { EmployeeService } from 'src/employee/employeeservice.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';


@Controller('employee') 
    export class EmployeeController{
    constructor(private readonly empService: EmployeeService) { }
    
    @Post("insertEmployee")
    @UsePipes(new ValidationPipe())
    inserManager(@Body() empDto:EmployeeForm) {
        return this.empService.insertUser(empDto);
    }


}
    
