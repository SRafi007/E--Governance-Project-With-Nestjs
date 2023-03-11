import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignUpController } from "src/admin/Controller/allusers.signup.controller";
import { AllUsersEntity } from "src/admin/Entity/allusers.signup.entity";
import { SignUpService } from "src/admin/Services/allusers.signup.service";



@Module({
imports: [TypeOrmModule.forFeature([AllUsersEntity])],
controllers: [SignUpController],
providers: [SignUpService],

})

export class AllUsersSignUpModule {}