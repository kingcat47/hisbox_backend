import { BadRequestException, Injectable } from '@nestjs/common';
import { UserReopository } from './repository/user.repository';
import { SignInReqDto } from './dto/sigin.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserReopository) {}

  async signIn(body: SignInReqDto): Promise<User> {
    const userId = await this.userRepository.findById(body.id);

    try {
      if (userId != null) {
        return userId;
      } else {
        throw new BadRequestException('아이디가없음음');
      }
    } catch {
      throw new BadRequestException('응 안돼돼');
    }
  }
}
