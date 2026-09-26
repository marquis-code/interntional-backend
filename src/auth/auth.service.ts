import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { EmailService } from '../utils/email.service';
import { RegisterDto, LoginDto, SetupPasswordDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = await this.usersService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      verificationFileUrl: registerDto.verificationFileUrl,
      // No password Hash here since it's an approval flow
    });

    await this.emailService.sendApplicationReceivedEmail(user.email, user.firstName);

    return { message: 'Registration successful. Account is pending approval.' };
  }

  async setupPassword(setupDto: SetupPasswordDto) {
    const user = await this.usersService.findBySetupToken(setupDto.token);
    if (!user) {
      throw new BadRequestException('Invalid or expired setup token.');
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(setupDto.password, salt);

    await this.usersService.updatePasswordAndActivate(user._id.toString(), passwordHash);

    return { message: 'Password set successfully. You can now login.' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'APPROVED') {
      throw new UnauthorizedException('Account is pending approval or rejected.');
    }

    // Track login
    await this.usersService.trackLogin(user._id.toString());

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      department: user.department,
      permissions: user.permissions || [],
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        permissions: user.permissions,
      },
    };
  }
}
