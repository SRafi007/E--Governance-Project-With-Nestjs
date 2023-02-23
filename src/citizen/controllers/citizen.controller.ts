import {Body, Controller,Delete,Get,Param,Post, Put, Query,Req, UsePipes,ValidationPipe,Session,Patch} from "@nestjs/common";
import { CitizenService } from "../services/citizen.service";
import { CitizenBioDTO,CitizenLoginDTO ,CitizenSignupDTO} from "src/DTO's/citizenDTO";
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
        return this.loginService.citizenLogin(loginInfo);
    }
    @Get('/profile/:id')
    myProfile(@Param('id',ParseIntPipe)id:number){
        return this.citizenService.citizenProfile(id);
    }


    @Put('/update')
    updateProfile(@Body()profile:CitizenSignupDTO){
        return this.citizenService.updateProfile(profile);
    }

    @Put('/bio/:id')
    updateBio(@Body()bio:CitizenBioDTO,@Param('id',ParseIntPipe)id:number){
        return this.citizenService.updateBio(bio,id);
    }

    @Get()
    getCitizen(){
        return this.citizenService.getCitizenData();
    }
//------------------------------------------------------------
//User can send mails to other Users
    @Post('/mail')
    @UsePipes(new ValidationPipe())
    sendMail(@Body()mail:sentMailDTO){
        return this.mailService.sendMail(mail)
    }

//MailBox return All sent and received mail informations
    @Get('/mailbox')
    mailbox(@Query('add')add:string){
        return this.mailService.mailbox(add);
    }
    @Delete('delete/:id')
    deleteMail(@Param('id')id:any){
        return this.mailService.deleteMail(id);
    }

    @Get('/mails')
    getMails(){
        return this.mailService.getMailData();
    }
//------------------------------------------------------------
    @Get('/history/:id')
    getHistory(@Param('id',ParseIntPipe)id:number){
        return this.citizenService.getHistory(id);
    }




}