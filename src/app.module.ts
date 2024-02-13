import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from "./User/user.service";
import { UserController } from "./User/user.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./User/user.entity"
import config from "../config/config"
import { ValidationMiddleware } from "./Middleware/validation.middleware"
import { updateUserSchema, userSchema } from './User/user.schema';
import { loginSchema } from "./Auth/auth.schema"
import { PasswordService } from './Common/password'; // Import PasswordService
import { PassportModule } from '@nestjs/passport';
import { AuthService } from "./Auth/auth.service"
import { AuthController } from "./Auth/auth.controller"
import { JwtMiddleware } from "./Middleware/jwt.middleware"
const { host, password, port, database, dbUserName } = config;
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: host,
    port: +port,
    password: password,
    username: dbUserName,
    // entities: [__dirname + '/../**/*.entity.js'],
    entities: [User],
    database: database,
    synchronize: true,
    logging: true,
  }), TypeOrmModule.forFeature([User]), PassportModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService, PasswordService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(new ValidationMiddleware(userSchema).use)
      .forRoutes({ path: '/user/create', method: RequestMethod.POST }); // Apply middleware to all routes

    consumer
      .apply(new ValidationMiddleware(loginSchema).use)
      .forRoutes({ path: '/auth/login', method: RequestMethod.POST }); // Apply middleware to all routes

    consumer
      .apply(new JwtMiddleware().use)
      .exclude(
        { path: '/user/create', method: RequestMethod.POST },
        { path: '/auth/login', method: RequestMethod.POST },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL })


    consumer
      .apply(new JwtMiddleware().use, new ValidationMiddleware(updateUserSchema).use)
      .forRoutes({ path: '/user/update', method: RequestMethod.PUT })
  }
} { }
