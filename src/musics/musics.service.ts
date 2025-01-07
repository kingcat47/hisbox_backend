import { Injectable } from '@nestjs/common';
import { Music } from './entity/music.entity';
import { createMusicDto } from './dto/create-music.dto';
import { MusicsRepository } from './types/musics.repository';
import { User } from 'src/user/entity/user.entity';
@Injectable()
export class MusicsService {
  private musics: Music[] = [];
  constructor(private musicsRepository: MusicsRepository) {}

  async getAllMusics(user: User): Promise<Music[]> {
    const music = await this.musicsRepository.getAllMusics(user);

    return music;
  }

  createMusic(body: createMusicDto, user: User): Promise<Music> {
    return this.musicsRepository.createMusic(body, user);
  }

  async getMusicById(id: number): Promise<Music> {
    const found = await this.musicsRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new Error('Music not found');
    }

    return found;
  }

  async getMusic() {
    return await 'Music';
  }

  async deleteMusic(id): Promise<void> {
    const result = await this.musicsRepository.delete(id);
    console.log(result);
  }
}
