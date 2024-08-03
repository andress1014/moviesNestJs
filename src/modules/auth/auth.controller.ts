import { Controller, Post, Body, UnauthorizedException, Query, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string, password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: { refreshToken: string }) {
    return this.authService.refreshAccessToken(refreshDto.refreshToken);
  }

  @Get('sendVerifyEmail')
  @UseGuards(JwtAuthGuard) // Aplica el guardia aquí
  async sendVerifyEmail(@Req() req: Request) {
    return this.authService.sendVerifyEmailService(req.body);
  }

  @Get('verifyEmail')
  async verifyEmail(@Query('sub') sub: number) {
    return this.authService.verifyEmailService(sub);
  }
}
