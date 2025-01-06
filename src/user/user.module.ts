import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserReopository } from './repository/user.repository';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.stragtegy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule],
  providers: [UserService, UserReopository, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
