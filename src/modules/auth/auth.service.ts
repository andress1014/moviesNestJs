import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/config/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService, // Inyecta el MailService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.dataValues.email, sub: user.dataValues.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      }),
      refresh_token: this.generateRefreshToken(user.id),
    };
  }

  generateRefreshToken(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const { sub } = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.usersService.findOneById(sub);
      if (!user) {
        throw new UnauthorizedException();
      }
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: this.configService.get<string>('JWT_SECRET'),
          expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
        }),
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async sendVerifyEmailService(body: any) {
    try {
      const { email, sub } = body.user;
      const user = await this.usersService.findOneById(sub);
      if (!user) {
        throw new Error('User not found');
      }
       // Enviar el correo de verificación
       const verificationLink = `${this.configService.get<string>('HOST_WEB')}/auth/verifyEmail?sub=${sub}`;
       const emailContent = `
         <p>Hello ${user.name},</p>
         <p>Please verify your email by clicking on the button below:</p>
         <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Email Verify</a>
         <p>If the button does not work, you can copy and paste the following link into your browser:</p>
         <p><a href="${verificationLink}">${verificationLink}</a></p>
       `;
 
       await this.mailService.sendMail(
         email,
         'Email Verification',
         emailContent, // Aquí usamos HTML
       );
      return { message: 'Verification email sent successfully' };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async verifyEmailService(sub: number) {
    try {
     const user = await this.usersService.findOneById(sub);
      if (!user) {
        throw new Error('User not found');
      }
      // Actualizar el campo email_verified_at
      await this.usersService.updateOneById(sub, { emailVerifiedAt: new Date(), active: true });

      return { message: 'Email verified successfully' };
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }
}
