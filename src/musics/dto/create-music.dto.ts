import { IsNotEmpty } from 'class-validator';

export class createMusicDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  link: string;

  text: string;
}
