import { SignUpController } from 'src/admin/Controller/allusers.signup.controller';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AllUsersEntity } from "src/admin/Entity/allusers.signup.entity";
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AllUsersSignUpForm } from 'src/admin/Data/allusers.signupform';


@Injectable()
export class SignUpService {

    constructor(
        @InjectRepository(AllUsersEntity)
        // private adminRepo: Repository<AdminEntity>,
        private signupRepo: Repository<AllUsersEntity>
    ) { }
    
    // getInsertedUser(mydto: AdminValidationForm): any {
    //     const adminAccount = new AdminEntity()
    //     adminAccount.name = mydto.name;
    //     adminAccount.email = mydto.email;
    //     adminAccount.password = mydto.password;
    //     adminAccount.salary = mydto.salary;
        
    //     return this.adminRepo.save(adminAccount);
    // }

    // getDashboard(): any {
    //     return this.adminRepo.find();
    // }

    async signup(signUpdto) {
        const salt = await bcrypt.genSalt();
        const hassedpassed = await bcrypt.hash(signUpdto.password, salt);
        signUpdto.password = hassedpassed;
        return this.signupRepo.save(signUpdto);
    }    

    // async signin(mydto){
    // //console.log(signIndto.password);
    // const mydata= await this.signupRepo.findOneBy({email: mydto.email});
    // const isMatch= await bcrypt.compare(mydto.password, mydata.password);
    // if(isMatch) {
    // return 1;
    // }
    // else {
    //     return 0;
    //     }
    // }

//     async signin(mydto){
//     console.log(mydto.password);
//     const mydata= await this.signupRepo.findOneBy({email: mydto.email});
//     const isMatch= await bcrypt.compare(mydto.password, mydata.password);
// if(isMatch) {
// return 1;
// }
// else {
//     return 0;
// }

// }
    async signin(mydto): Promise<any> {
    const s = await this.signupRepo.findOne({ where: { email: mydto.email } });
    if (s) {
      const match = await bcrypt.compare(mydto.password, s.password); // Compare the hashed password with the provided password
        if (match) {
        return 1;
        }
    }
    return 0;
    }  
}