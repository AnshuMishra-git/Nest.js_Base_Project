// auth.controller.ts
import { BadRequestException, Controller, HttpStatus, NotFoundException, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../User/user.entity';
import { UserService } from "../User/user.service"
import { PasswordService } from '../Common/password';
import { ResponseHelper } from '../Common/Response';
import { responeMessage } from "../../config/message"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) { }
  @Post('login')
  async login(@Request() req, @Res() res) {
    try {
      const { email, password } = req.body;
      const User = await this.userService.findUserByEmail(email);
      if (!User) throw new NotFoundException(responeMessage.WRONG_EMAIL_PASSWORD);
      const isMatched = await this.passwordService.comparePasswords(password, User.password)
      if (!isMatched) throw new BadRequestException(responeMessage.WRONG_EMAIL_PASSWORD);
      const access_token = await this.authService.signIn(User.email, User.id);
      const tokenResponse = await this.userService.updateUser(User.id, { token: access_token })
      return res.status(HttpStatus.OK).json(ResponseHelper.success({ tokenResponse }, responeMessage.LOGGEDIN_SUCCESSFULLY));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseHelper.error(error));
    }
  }

  @Post("logout")
  async logout(@Request() req, @Res() res) {
    try {
      const { id } = req.user;
      await this.userService.updateUser(id, { token: "" })
      return res.status(HttpStatus.OK).json(ResponseHelper.success({}, responeMessage.LOGGEDOUT_SUCCESSFULLY));
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseHelper.error(error));
    }
  }
}
