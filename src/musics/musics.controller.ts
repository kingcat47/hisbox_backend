import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { Music } from './entity/music.entity';
import { createMusicDto } from './dto/create-music.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entity/user.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createMusic(
    @Body() body: createMusicDto,
    @GetUser() user: User,
  ): Promise<Music> {
    return this.musicsService.createMusic(body, user);
  }

  @Delete('/:id')
  deleteMusic(@Param('id') id: number): void {
    this.musicsService.deleteMusic(id);
  }

  @Get('getall')
  @UseGuards(AuthGuard('jwt'))
  async getAllMusics(@GetUser() user: User) {
    console.log('모든음악을 가져오려고 시도중');
    const req = await this.musicsService.getAllMusics(user);
    console.log(req);
    return {
      data: 'test_data',
      message: 'test_message',
    };
  }

  @Get('/:id')
  async getMusicById(@Param('id') id: number): Promise<Music> {
    return await this.musicsService.getMusicById(id);
  }
}
