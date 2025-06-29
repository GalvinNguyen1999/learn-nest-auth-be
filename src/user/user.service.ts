import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserDtoInput,
  DeleteUserDtoInput,
  GetUserDtoInput,
  UpdateUserDtoInput,
} from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDtoInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!!user) {
      throw new HttpException('User already exists', HttpStatus.FOUND);
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        avatar: data.avatar,
        password: await bcrypt.hash(data.password, 10),
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: newUser,
    };
  }

  async updateUser(data: UpdateUserDtoInput) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        avatar: data.avatar,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async deleteUser(data: DeleteUserDtoInput) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.user.delete({
      where: { id: data.id },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }

  async getUser(data: GetUserDtoInput) {
    const { id, email } = data;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [...(id ? [{ id }] : []), ...(email ? [{ email }] : [])],
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data: user,
    };
  }
}
