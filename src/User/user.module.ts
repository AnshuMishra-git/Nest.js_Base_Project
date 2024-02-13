import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PasswordService } from "../Common/password"

@Module({
    imports: [PasswordService],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModuel { }