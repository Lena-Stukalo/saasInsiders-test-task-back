import { Controller, Post, Get, Body, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { IUserReg } from '../types/user.types';
import { CustomRequest } from '../types/service.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('/register')
  async register(
    @Body() data: IUserReg,
    @Req() _: Request,
    @Res() res: Response,
  ) {
    try {
      const result = await this.service.register(data);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  }
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.service.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  }
  @Get('/current')
  async current(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const result = await this.service.current(req.user);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  }
  @Get('/logout')
  async logout(@Req() req: CustomRequest, @Res() res: Response) {
    try {
      const result = await this.service.logout(req.user.id);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.status).json(error.message);
    }
  }
}
