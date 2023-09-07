import { Controller, Post, Get, Body, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { IUserReg } from 'src/types/user.types';
import { CustomRequest } from 'src/types/service.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('/register')
  async register(
    @Body() data: IUserReg,
    @Req() _: Request,
    @Res() res: Response,
  ) {
    const result = await this.service.register(data);
    res.send(result);
  }
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const result = await this.service.login(req.body);
    res.send(result);
  }
  @Get('/current')
  async current(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.current(req.user);
    res.send(result);
  }
  @Get('/logout')
  async logout(@Req() req: CustomRequest, @Res() res: Response) {
    const result = await this.service.logout(req.user.id);
    res.send(result);
  }
}
