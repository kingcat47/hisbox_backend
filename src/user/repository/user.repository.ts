import { In, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SignInReqDto } from '../dto/sigin.dto';

@Injectable()
export class UserReopository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createUser(signInReqDto: SignInReqDto) {
    const { id, password } = signInReqDto;
    const user = this.create({
      id: id,
      password: password,
    });
    return await this.save(user);
  }

  async findById(id: string): Promise<User | null> {
    // 사용자 ID로 조회
    return await this.findOne({ where: { id: id } });
  }
}

// import { Injectable } from '@nestjs/common';
// import { In, Repository } from 'typeorm';
// import { User } from '../entity/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class UserService extends Repository<User> {
//   constructor(
//     @InjectRepository(User)
//     private readonly repository: Repository<User>,
//   ) {
//     super(repository.target, repository.manager, repository.queryRunner);
//   }

//   async createUser(
//     id: string,
//     password: string,
//     username: string,
//   ): Promise<User> {
//     try {
//       const saltRound = 10;
//       const salt = await bcrypt.genSalt(saltRound);
//       console.log('salt', salt);
//       // 비밀번호 단방향 암호화
//       const hashedPassword = await bcrypt.hash(password, salt);
//       const user = this.create({
//         id,
//         password: hashedPassword,
//         username,
//       });
//       return await this.save(user);
//     } catch (e) {
//       throw e;
//     }
//   }

//   async findByAccountId(accountId: number): Promise<User | null> {
//     // 사용자 account ID로 조회
//     return await this.findOne({ where: { accountId: accountId } });
//   }

//   async findById(id: string): Promise<User | null> {
//     // 사용자 ID로 조회
//     return await this.findOne({ where: { id: id } });
//   }

//   async deleteUser(accountId: number): Promise<User | null> {
//     const user = await this.findOneBy({ accountId: accountId });
//     if (!user) {
//       return null; // 삭제 대상 사용자가 없으면 null 반환
//     }
//     await this.remove(user); // 조회된 엔티티를 삭제
//     return user; // 삭제된 사용자를 반환
//   }
// }
