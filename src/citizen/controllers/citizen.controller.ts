import {Body, Controller,Delete,Get,Param,Post, Put, Query,Req, UsePipes,ValidationPipe,Session,Patch} from "@nestjs/common";
import { CitizenService } from "../services/citizen.service";
import { CitizenDTO,CitizenLoginDTO ,CitizenSignupDTO} from "src/DTO's/citizenDTO";
import {Request} from "express";
import { LoginService } from "src/Common/login.service";
import { MailDTO,sentMailDTO } from "src/DTO's/mailDTO";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { MailService } from "../services/mail.service";


@Controller('citizen')
export class CitizenController{
  
    constructor(private  citizenService: CitizenService, private loginService: LoginService,private mailService: MailService){}

    @Put('/signup')
    @UsePipes(new ValidationPipe())
    citigenSignup(@Body()citizen:CitizenSignupDTO){
        return this.citizenService.citigenSignup(citizen);
        //return this.loginService.citigenSignup(citizen);
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    citizenLogin(@Body()loginInfo:CitizenLoginDTO){
        return this.citizenService.citizenLogin(loginInfo);
    }
    
    @Get('/profile/:id')
    myProfile(@Param('id',ParseIntPipe)id:number){
        return this.citizenService.citizenProfile(id);
    }
    @Put('/update')
    updateProfile(@Body()profile:CitizenSignupDTO){
        return this.citizenService.updateProfile(profile);
    }
    @Post('/mail')
    @UsePipes(new ValidationPipe())

    sendMail(@Body()mail:sentMailDTO){
        return this.mailService.sendMail(mail)
    }
    @Get('/mailbox')
    mailbox(@Query('add')id:string){
        return this.mailService.mailbox(id);
    }

    @Get()
    getCitizen(){
        return this.citizenService.getCitizenData();
    }
    @Get('/mails')
    getMails(){
        return this.mailService.getMailData();
    }
    @Delete('delete/:id')
    deleteMail(@Param('id')id:any){
        return this.mailService.deleteMail(id);
    }



}