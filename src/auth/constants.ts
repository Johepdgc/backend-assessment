import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConstants = {
  secret: configService.get<string>('JWT_SECRET'),
  expiresIn: configService.get<string>('JWT_EXPIRATION') ?? '1h',
};
