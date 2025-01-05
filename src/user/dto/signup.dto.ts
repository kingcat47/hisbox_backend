import { IsString } from 'class-validator';

export class SignUpReqDto {
  @IsString()
  id: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}
