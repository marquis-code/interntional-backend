import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, SetupPasswordDto, ForgotPasswordDto, ResetPasswordDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('setup-password')
  async setupPassword(@Body() setupDto: SetupPasswordDto) {
    return this.authService.setupPassword(setupDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotDto.email, forgotDto.source);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetDto);
  }

  @Post('send-otp')
  async sendOtp(@Body() body: { email: string; firstName: string; source?: string }) {
    return this.authService.sendOtp(body.email, body.firstName, body.source as any);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  // ── ADMIN-SPECIFIC ENDPOINTS ─────────────────────────────────────

  /** Step 1: Admin submits email+password → validates creds, sends OTP */
  @Post('admin/login')
  async adminLogin(@Body() body: { email: string; password: string }) {
    return this.authService.adminLoginStep1(body.email, body.password);
  }

  /** Step 2: Admin submits the OTP received by email → returns JWT */
  @Post('admin/verify-otp')
  async adminVerifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.adminVerifyOtp(body.email, body.otp);
  }

  /** Admin forgot password */
  @Post('admin/forgot-password')
  async adminForgotPassword(@Body() body: { email: string }) {
    return this.authService.adminForgotPassword(body.email);
  }

  /** Admin reset password */
  @Post('admin/reset-password')
  async adminResetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.adminResetPassword(body.token, body.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.userId);
  }
}
