import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DoctorForm } from 'src/doctor/doctorRes/doctor.dto';
import { DoctorService } from 'src/doctor/doctorRes/doctor.service';
//import {DoctorService} from 'src/doctor/doctor.service';

import { CreateCampaignDto, EmployeeForm } from './employeeform.dto';
import { EmployeeFormUpdate } from './employeeformupdate.dto';
import { EmployeeService } from './employeeservice.service';
//import { SessionGuard } from './session.guard';
import { SessionGuard } from './session.guard';

@Controller('/employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService,
    private doctorService: DoctorService
    ) {}
@Get()
getResponse(){
  return "connected";
}
  @Get('/index')
  getEmployee(): any {
    return this.employeeService.getIndex();
  }
  
  @Get('/findemployee/:id')
  getEmployeeByID(@Param('id', ParseIntPipe) id: number): any {
    return this.employeeService.getUserByID(id);
  }


  @Get('/findemployee')
  getEmployeeByIDName(@Query() qry: any): any {
    return this.employeeService.getUserByIDName(qry);
  }
  @Post('/updateemployee/:id')
  @UseGuards(new SessionGuard)
@UsePipes(new ValidationPipe())
  insertEmployee(@Body() mydto,@Param('id', ParseIntPipe) id:number): any {
    return this.employeeService.updatetuserInfo(mydto,id);
  }

  // @Put('/updateemployee/')
  // @UseGuards(SessionGuard)
  // @UsePipes(new ValidationPipe())
  // updateEmployee(@Session() session,@Body('name') name: string): any {
  //   console.log(session.email);
  //   return this.employeeService.updateUser(name, session.email);
  // }

  @Put('/updateemployee/:id')
  @UseGuards(new SessionGuard)
  @UsePipes(new ValidationPipe())
  updateEmployeebyid(
    @Body() mydto: EmployeeFormUpdate,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.employeeService.updateUserbyid(mydto, id);
  }
  @Get('/history/:id')
getHistory(@Param('id',ParseIntPipe)id:number){
  return this.employeeService.getHistory(id);
}


  @Delete('/deleteemployee/:id')
  @UseGuards(new SessionGuard)
  deleteEmployeebyid(@Param('id', ParseIntPipe) id: number): any {
    return this.employeeService.deleteUserbyid(id);
   
  }

  @Post('/insertdoctor')
  @UsePipes(new ValidationPipe())
    insertDoctor(@Body() doctordto: DoctorForm): any {
      return this.doctorService.insertDoctor(doctordto);
    }
   
    @Get('/finddoctorsbyemployee/:id')
    getDoctorByEmployeeID(@Param('id', ParseIntPipe) id: number): any {
      return this.employeeService.getDoctorsByemployeeID(id);
    }

    @Get('/findemployeebydoctor/:id')
    getEmployeeByDoctorID(@Param('id', ParseIntPipe) id: number): any {
       return this.doctorService.getDoctorsByemployeeID(id);
    }
   //-----------------------
   @Post('/addcampagin')
   addCampagin(@Body()campagin){
    return this.employeeService.addCampaign(campagin);
   }
@Post('/signup')
@UseInterceptors(FileInterceptor('file',
{storage:diskStorage({
  destination: './Employeeuploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:EmployeeForm,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 600000 }),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filename = file.originalname;  
console.log(file)
//return this.employeeService.signup(mydto);
return this.employeeService.insertUser(mydto);

}

@Post('/signin')
signin(@Session() session, @Body() mydto:EmployeeForm)
{
if(this.employeeService.signin(mydto))
{
  session.email = mydto.email;

  console.log(session.email);
  return {message:"success"};

}
else
{
  return {message:"invalid credentials"};
}
 
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}
// @Post('/sendemail')
// sendEmail(@Body() mydata){
// return this.employeeService.sendEmail(mydata);
// }

}
