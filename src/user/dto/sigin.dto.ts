import { IsString } from 'class-validator';

export class SignInReqDto {
  @IsString()
  id: string;

  @IsString()
  password: string;
}
