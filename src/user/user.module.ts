import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserReopository } from './repository/user.repository';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.stragtegy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // JWT 비밀키 설정
      signOptions: { expiresIn: 60 * 60 }, // 기본 만료 시간 설정
    }),
  ],
  providers: [UserService, UserReopository, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}
