import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;
  // @Column()
  // image: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.musics, { eager: false })
  // @JoinColumn({ name: 'userId' })
  user: User;
}
