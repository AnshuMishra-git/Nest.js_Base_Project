import { Controller, Post, Body, ConflictException, Res, HttpStatus, Get, Req, Put, Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from "./user.service"
import { PasswordService } from '../Common/password';
import { ResponseHelper } from 'src/Common/Response';
import { responeMessage } from "../../config/message"

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
        private readonly passwordService: PasswordService) { }

    @Post("create")
    async create(@Body() user: User, @Res() res): Promise<User> {
        try {
            const { email, password } = user;
            const existingUser = await this.userService.findUserByEmail(email);
            if (existingUser) throw new ConflictException('User Already Exsist');
            user.password = await this.passwordService.hashPassword(password)
            const userResponse = await this.userService.create(user);
            delete userResponse.password
            return res.status(HttpStatus.CREATED).json(ResponseHelper.success(userResponse, responeMessage.USER_REGISTERED));
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseHelper.error(error));
        }
    }

    @Get("profile")
    async profile(@Res() res, @Req() req): Promise<User> {
        try {
            const { id } = req.user;
            const userResponse = await this.userService.findById(id)
            return res.status(HttpStatus.OK).json(ResponseHelper.success(userResponse, responeMessage.USER_DETAILS_FETCHED));
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseHelper.error(error));
        }
    }


    @Put("update")
    async update(@Res() res, @Req() req): Promise<User> {
        try {
            const { id } = req.user;
            const updateUser = await this.userService.updateUser(id, req.body)
            return res.status(HttpStatus.OK).json(ResponseHelper.success(updateUser, responeMessage.USER_DETAILS_UPDATED));
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseHelper.error(error));
        }
    }

    @Delete("delete")
    async delete(@Res() res, @Req() req): Promise<User> {
        try {
            const { id } = req.user;
            await this.userService.deleteUser(id)
            return res.status(HttpStatus.OK).json(ResponseHelper.success({}, responeMessage.USER_DELETED_SUCCESSFULLY));
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseHelper.error(error));
        }
    }
}