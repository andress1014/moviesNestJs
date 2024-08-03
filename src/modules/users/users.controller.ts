import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string; }) {
    const user = await this.usersService.createUser(body.email, body.password, body.name);
    return { id: user.id, email: user.email, name: user.name, active: user.active };
  }
}
