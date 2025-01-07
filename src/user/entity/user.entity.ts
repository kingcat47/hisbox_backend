import { Music } from 'src/musics/entity/music.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  accountId: number; //고유

  @Column()
  id: string; //id

  @Column()
  username: string; //이름

  @Column()
  password: string; //암호

  @Column({ default: false })
  isBlocked: boolean; //정상인놈인지

  @OneToMany(() => Music, (music) => music.user, { eager: true })
  // @JoinColumn({ name: 'accountId' })
  musics: Music[];
}
