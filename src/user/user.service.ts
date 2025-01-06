import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserReopository } from './repository/user.repository';
import { SignInReqDto } from './dto/sigin.dto';
import { User } from './entity/user.entity';
import { SignUpReqDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import { addHours } from 'date-fns';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserReopository,
    private jwtService: JwtService,
  ) {}

  async signUp(body: SignUpReqDto) {
    try {
      console.log('서비스시작작');
      const userinfo = await this.userRepository.createUser(body);

      console.log('서비스시끜끜끜');
      return userinfo;
    } catch {
      throw new BadRequestException('입구컷');
    }
  }

  async signIn(body: SignInReqDto): Promise<{ accessToken: string }> {
    const userinfo = await this.userRepository.findById(body.id);

    try {
      if (userinfo != null) {
        const checkPw = await bcrypt.compare(body.password, userinfo.password);
        if (checkPw == true) {
          const payload = { username: userinfo.username };
          const accessToken = await this.jwtService.sign(payload);
          return { accessToken: accessToken };
        } else {
          throw new BadRequestException('비번체크 오류류');
        }
      } else {
        throw new BadRequestException('없는이름임');
      }
    } catch {
      throw new BadRequestException('응 안돼');
    }
  }

  async createToken(type, data: any): Promise<string> {
    const expTime = addHours(new Date(), 2);

    const token = jwt.sign({ ...data, expTime }, process.env.JWT_SECRET_KEY, {
      algorithm: 'HS256',
      expTime: type == 'ACCESS_TOKEN' ? 7200 : 1209600,
    });
    return token;
  }

  async refreshToken(tokenDto: TokenDto): Promise<any> {
    try {
      const user = jwt.verify(
        tokenDto.refreshToken,
        process.env.JWT_SECRET_KEY,
      );

      const userInfo = await this.userRepository.findByAccountId(
        user.accountId,
      );
      if (userInfo == null) {
        throw new UnauthorizedException();
      }

      const accessToken = await this.createToken(
        { accountId: userInfo.accountId },
        'ACCESS_TOKEN',
      );
      // 나중에는 refreshToken의 만료일을 체크해서 발급
      const refreshToken = await this.createToken(
        { accountId: userInfo.accountId },
        'REFRESH_TOKEN',
      );

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException(
        'Refresh token이 유효하지 않거나 만료되었습니다.',
      );
    }
  }
}
