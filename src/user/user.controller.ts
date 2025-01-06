import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInReqDto } from './dto/sigin.dto';
import { SignUpReqDto } from './dto/signup.dto';
import { TokenDto } from './dto/token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() body: SignUpReqDto) {
    const req = await this.userService.signUp(body);

    return {
      message: '회원가입을 함',
      data: req,
    };
  }

  @Post('/signin')
  async signIn(@Body() body: SignInReqDto) {
    const req = await this.userService.signIn(body);

    return {
      message: '로그인 성공',
      data: req,
    };
  }

  @Post('token')
  async resetToken(@Body() body:TokenDto){
    const req = await this.userService.refreshToken(body);
  }
}
