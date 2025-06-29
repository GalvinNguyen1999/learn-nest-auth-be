import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDtoInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class SignInDtoOutput {
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: User;
}
