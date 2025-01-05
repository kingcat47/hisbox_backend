import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  accountId: number;
  @Column()
  id: string;
  @Column()
  password: string;
  @Column()
  isBlocked: boolean;
}
