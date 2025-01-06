import { In, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SignUpReqDto } from '../dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserReopository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(signupReqDto: SignUpReqDto): Promise<User> {
    const { id, password, username } = signupReqDto;

    try {
      console.log('아이디만들준비비');

      const salt = await bcrypt.genSalt();
      const hashedPw = await bcrypt.hash(password, salt);
      const user = this.create({ id, password: hashedPw, username });
      console.log('아이디만들준끝');
      return await this.save(user);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findById(id: string): Promise<User | null> {
    // 사용자 ID로 조회
    return await this.findOne({ where: { id: id } });
  }

  async findByAccountId(accountId: number): Promise<User | null> {
    return await this.findOne({ where: { accountId: accountId } });
  }
}
