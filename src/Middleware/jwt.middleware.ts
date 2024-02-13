import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from "../../config/config"
import { ResponseHelper } from 'src/Common/Response';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            const token = authorizationHeader.substring(7); // Remove 'Bearer ' from the token
            try {
                const decoded = jwt.verify(token, config.jwtKey);
                //@ts-ignore
                req.user = decoded;
            } catch (error) {
                console.error('Error decoding token:', error);
                return res.status(HttpStatus.UNAUTHORIZED).json(ResponseHelper.error(error));

            }
        } else return res.status(HttpStatus.UNAUTHORIZED).json(ResponseHelper.error("Invalid Token", 401));
        next();
    }
}
