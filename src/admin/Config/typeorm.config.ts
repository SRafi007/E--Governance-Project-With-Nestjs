import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmModuleConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'goodboy',
    database: 'Practice1',
    autoLoadEntities: true,
    synchronize: true,
}