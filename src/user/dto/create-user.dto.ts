import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDtoInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  name: string;

  @IsOptional()
  password: string;

  @IsOptional()
  avatar: string;
}

export class CreateUserDtoOutput {
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: User;
}
