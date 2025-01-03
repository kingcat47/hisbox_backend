import { Module } from '@nestjs/common';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entity/music.entity';
import { MusicsRepository } from './types/musics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MusicsRepository])],
  controllers: [MusicsController],
  providers: [MusicsService],
})
export class MusicsModule {}
