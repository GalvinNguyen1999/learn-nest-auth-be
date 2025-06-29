import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDtoInput,
  CreateUserDtoOutput,
  DeleteUserDtoInput,
  DeleteUserDtoOutput,
  GetUserDtoInput,
  GetUserDtoOutput,
  UpdateUserDtoInput,
  UpdateUserDtoOutput,
} from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() input: CreateUserDtoInput,
  ): Promise<CreateUserDtoOutput> {
    return this.userService.createUser(input);
  }

  @Get('get')
  async get(@Body() input: GetUserDtoInput): Promise<GetUserDtoOutput> {
    return this.userService.getUser(input);
  }

  @Put('update')
  async update(
    @Body() input: UpdateUserDtoInput,
  ): Promise<UpdateUserDtoOutput> {
    return this.userService.updateUser(input);
  }

  @Delete('delete')
  async delete(
    @Body() input: DeleteUserDtoInput,
  ): Promise<DeleteUserDtoOutput> {
    return this.userService.deleteUser(input);
  }
}
