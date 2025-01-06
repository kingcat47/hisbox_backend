import {
  BaseEntity,
  Column,
  Entity,
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
}
