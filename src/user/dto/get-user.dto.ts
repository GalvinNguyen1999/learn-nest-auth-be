import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class GetUserDtoInput {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

export class GetUserDtoOutput {
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: User;
}
