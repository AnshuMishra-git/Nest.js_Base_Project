import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

import { User } from "./user.entity"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | undefined> {
    const userResponse = await this.userRepository.findOne({ where: { id } });
    delete userResponse.password
    delete userResponse.id
    return userResponse
  }

  async updateUser(@Param('id') id: number, @Body() payload: Partial<User>): Promise<any> {
    await this.userRepository.update(id, payload);
    const userResponse = await this.userRepository.findOne({ where: { id } });
    delete userResponse.password
    delete userResponse.id
    return userResponse
  }

  async deleteUser(@Param('id') id: number): Promise<any> {
    return await this.userRepository.delete(({ id }))
  }
}