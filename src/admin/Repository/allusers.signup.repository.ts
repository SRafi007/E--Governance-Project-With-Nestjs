import { InjectRepository } from '@nestjs/typeorm';
import { AllUsersEntity } from 'src/admin/Entity/allusers.signup.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AllUsersEntity)
export class SignUpRepository extends Repository<AllUsersEntity>{}