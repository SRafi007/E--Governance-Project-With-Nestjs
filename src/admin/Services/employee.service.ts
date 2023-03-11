import { adminRepository } from './../Repository/admin.repository';
import { EmployeeForm } from './../Data/employee.dto';
import { EmployeeRepository } from '../Repository/employee.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/admin/Entity/employee.entity';

@Injectable()
export class EmployeeService{

    constructor(@InjectRepository(EmployeeEntity)
    private empRepo: EmployeeRepository,
    ) { }

    
    $InsertUser(empDto:EmployeeForm):any {
        const myValues = new EmployeeEntity();

        myValues.name = empDto.name;
        myValues.email = empDto.email;
        myValues.password = empDto.password;

        return this.empRepo.save(myValues);
    }

    insertEmployee(mydto:EmployeeForm):any {
    //const employeeAccount = new EmployeeEntity();

    // employeeAccount.name = mydto.name;
    // employeeAccount.email = mydto.email;
    // employeeAccount.password = mydto.password;
    //managerAccount.salary = mydto.salary;
   return this.empRepo.save(mydto);
    }

    getAdminUsingEmpId(id): any{
        return this.empRepo.find({
            where: { id: id },
            relations: {
                admin: true,
            },
        });
    }

    deleteEmployeeByAdminId(id: any) {
        
        //     // return this.empRepo.remove()
        //return await this.empRepo.createQueryBuilder('employees').delete().from(EmployeeEntity).where("id = id", { id: id }).execute()
        const del = this.empRepo.findOne({where:{id:id,},});
        if (del) {
            return this.empRepo.delete({ id: id });
            } else {
                //throw new HttpException('not found', HttpStatus.NOT_FOUND);
            return ;
            }
        //this.empRepo.delete({ id: id });

        //return "Kicked out!!";

    }
          
    //     const del = await this.empRepo.findOne(id);
    //     if (del) {
    //         del.admin = del.employee.filter(admin=>)
    // async delete(EmployeeEntity: EmployeeService, id: any) {
    //     }
    // }
        

}