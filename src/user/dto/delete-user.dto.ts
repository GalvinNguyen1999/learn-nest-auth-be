import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class DeleteUserDtoInput {
  @IsUUID()
  @IsNotEmpty()
  id: string
}

export class DeleteUserDtoOutput {
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: User;
}
