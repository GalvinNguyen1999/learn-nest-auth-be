import { User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateUserDtoInput {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  password: string;

  @IsOptional()
  avatar: string;
}

export class UpdateUserDtoOutput {
  @IsNotEmpty()
  statusCode: number;

  @IsNotEmpty()
  message: string;

  @IsOptional()
  data?: User;
}
