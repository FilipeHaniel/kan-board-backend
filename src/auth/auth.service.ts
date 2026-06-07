import { Injectable, ConflictException } from '@nestjs/common'

import * as bcrypt from 'bcrypt'

import { RegisterDto } from './dto/register.dto'
import { UsersService } from '@/users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(dto: RegisterDto) {
    const userExists = await this.usersService.findByEmail(dto.email)

    if (userExists) {
      throw new ConflictException('Email already exists')
    }

    const passwordHash = await bcrypt.hash(dto.password, 10)

    return this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
    })
  }
}
