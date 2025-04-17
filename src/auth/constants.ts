import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const jwtConstants = {
  secret: configService.get('JWT_SECRET'),
  expiresIn: configService.get('JWT_EXPIRATION') || '1h',
};
