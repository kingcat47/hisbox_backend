import { Injectable } from '@nestjs/common';
import { Music } from '../entity/music.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMusicDto } from '../dto/create-music.dto';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class MusicsRepository extends Repository<Music> {
  constructor(
    @InjectRepository(Music)
    private readonly repository: Repository<Music>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createMusic(body: createMusicDto, user: User): Promise<Music> {
    const { title, link, text } = body;
    const music = this.create({
      // id: uuid(),
      title: title,
      link: link,
      text: text,
      user: user,
    });
    console.log(user.accountId);
    await this.save(music);
    return music;
  }

  async getMusicById(id: number): Promise<Music> {
    return await this.findOne({ where: { id: id } });
  }

  async getAllMusics(user: User): Promise<Music[]> {
    try {
      console.log('시작했다다');
      const music = await this.find({
        where: { user: { accountId: user.accountId } },
      });
      console.log('끝났다다');
      return music;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
