import{Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginService } from "src/Common/login.service";
import { Citizen } from "src/entities/citizens.entity";
import { Mail } from "src/entities/mails.entity";
import { CitizenController } from "../controllers/citizen.controller";
import { CitizenService } from "../services/citizen.service";
import { MailService } from "../services/mail.service";
@Module({
    imports: [TypeOrmModule.forFeature([Citizen,Mail])],
    controllers:[CitizenController],
    providers:[CitizenService,LoginService,MailService]
})
export class CitizenModule {}