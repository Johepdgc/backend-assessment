import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Simulate an asynchronous user validation logic
    const user = await new Promise((resolve) =>
      setTimeout(() => {
        if (username === 'test' && password === 'test') {
          resolve({ userId: 1, username });
        } else {
          resolve(null);
        }
      }, 100),
    );
    return user;
  }

  login(user: { username: string; userId: number }) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
