import { EmployeeForm } from 'src/employee/employeeform.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Patch, UseGuards } from '@nestjs/common/decorators';
import { AdminForm, AdminName } from '../Data/adminformupdate.dto';
import { AdminFormUpdate } from '../Data/adminmodule.dto';
import { AdminService } from '../Services/adminservice.service';
//import { EmployeeService } from 'src/Services/employee.service';
import { EmployeeService } from 'src/employee/employeeservice.service';
//import { SessionGuard } from 'src/Controller/session.guard';
import {SessionGuard} from 'src/admin/Controller/session.guard';

@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService,
    private empService: EmployeeService,
        //privatee MailService:

  ) { }

  // login, singup, relationship of Crud, mail send, file upload
  
  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }

  @Get("allNames")
  findAllNames(): any {
    return this.adminService.getallNames();
  }

  @Get("allEmails")
  findAllEmails(): any {
    return this.adminService.getallEmails();
  }

  @Get('/findadmin/:id')
  getAdminByID(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.getUserByID(id);
  }

  //  @Get("findAdmin/:name")

  @Get("allsal")
  findSal(): any {
    var total = this.adminService.getallNumbers();
    // var s = "total salary gets";
    return total;
  }
  @Get('/findadmin/name')
  getAdminByIDName(@Param() p: any): any {
    return this.adminService.getUserByIDName(p);
  }

  @Get("findinfoByName/:name")
  getAdminNames(@Param("name") name: string): any {
    return this.adminService.getAdminByName(name);
  }
  
  // ------------------------------------
  @Post('/insertAdmin')
  @UsePipes(new ValidationPipe())
  insertAdmin(@Body() mydto: AdminForm): any {
    return this.adminService.insertUser(mydto);
  }

  @Patch('/updateAdmin/')
  @UsePipes(new ValidationPipe())
  updateAdmin(@Body('name') name: string, @Body('id') id: number): any {
    return this.adminService.updateUser(name, id);
  }

  @Put('/updateadmin/:id')
  @UseGuards(new SessionGuard)
  @UsePipes(new ValidationPipe())
  updateAdminbyid(
    @Body() mydto: AdminForm,
    @Param('id', ParseIntPipe) id: number,
  ): any {
    return this.adminService.updateUserbyid(mydto, id);
  }

  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteUserbyid(id);
  }

  //emp--------------------------------------------------
  @Post("/insertEmployee")
  @UsePipes(new ValidationPipe())
  insertEmployee(@Body() empDto: EmployeeForm): any{
    return this.empService.insertUser(empDto);
  }

  @Get("findEmployeeByAdmin/:id")
  getEmployeeByAdminId(@Param("id", ParseIntPipe) idParam: number): any{
    return this.adminService.getEmpUsingAdminID(idParam);
  }

  @Get("findAdminByEmployee/:id")
  getAdminByEmployeeId(@Param("id",ParseIntPipe)idParam) {
    return this.empService.getAdminUsingEmpId(idParam);
  }

  @Delete("deleteEmployeeUsingHisId/:id")
  deleteEmployeeById(@Param("id",ParseIntPipe)IdParam:any) {
    return this.empService.deleteEmployeeByAdminId(IdParam);
  }

  // @Get("find")
  // @UseGuards(SessionGuardd)
  // dashboard() {
  //   return { message: "Done" }
  // }

      @Post('sendemail')
      sendEmail(@Body() mydata){
        return this.adminService.sendEmail(mydata);
      } 
}