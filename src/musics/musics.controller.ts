import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { Music } from './entity/music.entity';
import { createMusicDto } from './dto/create-music.dto';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  @Get()
  async getAllMusics(): Promise<Music[]> {
    return await this.musicsService.getAllMusics();
  }

  @Post('/musics')
  createMusic(@Body() body: createMusicDto): Promise<Music> {
    return this.musicsService.createMusic(body);
  }

  @Get('/:id')
  async getMusicById(@Param('id') id: number): Promise<Music> {
    return await this.musicsService.getMusicById(id);
  }
}
