import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common'

import * as bcrypt from 'bcrypt'

import { RegisterDto } from './dto/register.dto'
import { UsersService } from '@/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password)

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    })

    return {
      access_token: accessToken,
    }
  }
}
