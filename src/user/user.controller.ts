import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInReqDto } from './dto/sigin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signin')
  async signIn(@Body() body: SignInReqDto) {
    const req = await this.userService.signIn(body);
  }
}
