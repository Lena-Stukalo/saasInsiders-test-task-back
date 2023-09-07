import { Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';
import { CustomRequest } from '../types/service.type';
import { JwtService } from '@nestjs/jwt';
import { RequestError } from '../helpers/RequestError';
import { User } from '../entities/user.entities';
import { IUser } from '../types/user.types';

export interface IDecoded {
  id: string;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: CustomRequest, _: Response, next: NextFunction): Promise<any> {
    const auth: string | undefined = req.headers['authorization'];
    console.log('auth mid');
    try {
      const [bearer, token] = auth.split(' ');
      if (bearer !== 'Bearer') {
        throw RequestError(401, 'Unauthorized');
      }
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY!,
      })) as IDecoded;
      const user = (await User.findOneBy({ id: payload.id })) as IUser;
      if (!user || user.token !== token) {
        throw RequestError(401, 'Unauthorized');
      }
      req.user = user;
      next();
    } catch (error: any) {
      if (!error.status) {
        error.status = 401;
      }
      throw RequestError(401, 'Unauthorized');
    }
  }
}
