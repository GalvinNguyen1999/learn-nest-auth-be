import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.upsert({
      where: { email: data.email },
      update: { name: data.name, avatar: data.avatar },
      create: {
        email: data.email,
        name: data.name,
        avatar: data.avatar,
      },
    });
  }
}
