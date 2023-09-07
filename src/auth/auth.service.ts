import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserReg, IUserLog, IUser } from 'src/types/user.types';
import { User } from '../entities/user.entities';
import { RequestError } from '../helpers/RequestError';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async register(data: IUserReg) {
    const { password, email } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      ...data,
      password: hashPassword,
      token: '',
    });
    result.save();
    const user = await User.findOneBy({ email });
    const payload = {
      id: user.id,
    };

    const token = await this.jwtService.signAsync(payload);
    await User.update({ id: user.id }, { token });
    return {
      token,
    };
  }

  async login(data: IUserLog) {
    const { email, password } = data;
    const user = await User.findOneBy({ email });
    const passwordCompare = await bcrypt.compare(password, user!.password);
    if (!passwordCompare) {
      throw RequestError(401, 'Email or password wrong');
    }
    const payload = {
      id: user!.id,
    };
    const token = (await this.jwtService.signAsync(
      payload,
    )) as unknown as string;
    await User.update({ id: user!.id }, { token });
    return {
      token,
    };
  }

  async current(user: IUser) {
    const { email, name } = user;
    return {
      email,
      name,
    };
  }

  async logout(id: string) {
    await User.update({ id }, { token: '' });
    return {
      message: 'Logout success',
    };
  }
}
