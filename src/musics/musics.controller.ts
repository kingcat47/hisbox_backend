import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { Music } from './entity/music.entity';
import { createMusicDto } from './dto/create-music.dto';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  createMusic(@Body() body: createMusicDto): Promise<Music> {
    return this.musicsService.createMusic(body);
  }

  @Delete('/:id')
  deleteMusic(@Param('id') id: number): void {
    this.musicsService.deleteMusic(id);
  }

  @Get()
  getAllMusics(): Promise<Music[]> {
    return this.musicsService.getAllMusics();
  }

  @Get('/:id')
  async getMusicById(@Param('id') id: number): Promise<Music> {
    return await this.musicsService.getMusicById(id);
  }
}
