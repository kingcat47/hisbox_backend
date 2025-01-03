import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7682',
  database: 'hisbox',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, //자료형 변하면 테이블도 같이 바꿔줌줌
};
