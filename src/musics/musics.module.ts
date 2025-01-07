import { Module } from '@nestjs/common';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entity/music.entity';
import { MusicsRepository } from './types/musics.repository';
import { JwtStrategy } from 'src/user/strategy/jwt.stragtegy';
import { User } from 'src/user/entity/user.entity';
import { UserReopository } from 'src/user/repository/user.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [MusicsController],
  imports: [PassportModule, TypeOrmModule.forFeature([Music, User])],
  providers: [MusicsService, MusicsRepository, JwtStrategy, UserReopository],
})
export class MusicsModule {}
