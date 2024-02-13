import { Dependencies, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../User/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import config from "../../config/config"
@Injectable()
@Dependencies(User)
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  private readonly secretKey = config.jwtKey; // You should store this secret securely, maybe as an environment variable
  async signIn(email: string, id: number) {
    const user = await this.userRepository.findOne(({ where: { email } }));

    if (!(user && user?.password)) {
      throw new UnauthorizedException();
    }
    const jwtToken = jwt.sign({ email, id }, this.secretKey);
    return jwtToken;
  }
}

@Injectable()
export class DecodeService {
  // Method to decode the JWT token and return its payload
  private readonly secretKey = config.jwtKey;
  decodeToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      // Handle invalid tokens or token expiration here
      console.error('Error decoding token:', error);
      return null;
    }
  }
}