import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDtoInput } from './dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(data: SignInDtoInput) {
    const { email, password } = data;

    try {
      const user = await this.usersService.getUser({
        email,
      });

      // Kiểm tra password
      const isPasswordValid = await bcrypt.compare(password, user.data.password);
      
      if (!isPasswordValid) {
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        });
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Sign in successful',
        data: user.data,
      };
    } catch (error) {
      // Nếu user không tồn tại hoặc có lỗi khác
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Invalid credentials',
      });
    }
  }
}
