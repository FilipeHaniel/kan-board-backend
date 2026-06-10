import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty({
    example: 'Filipe',
  })
  @IsString()
  name!: string

  @ApiProperty({
    example: 'filipe@email.com',
  })
  @IsEmail()
  email!: string

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  password!: string
}
