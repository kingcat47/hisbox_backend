import { Injectable } from '@nestjs/common';
import { Music } from '../entity/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMusicDto } from '../dto/create-music.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MusicsRepository extends Repository<Music> {
  constructor(
    @InjectRepository(Music)
    private readonly repository: Repository<Music>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createMusic(body: createMusicDto): Promise<Music> {
    const { title, link, text } = body;
    const music = this.create({
      // id: uuid(),
      title: title,
      link: link,
      text: text,
    });
    await this.save(music);
    return music;
  }

  async getMusicById(id: number): Promise<Music> {
    return await this.findOne({ where: { id: id } });
  }
}
