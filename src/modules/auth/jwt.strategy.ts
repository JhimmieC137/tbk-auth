import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { baseConfig } from 'src/settings/base.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: baseConfig().jwt_secret,
    });
  }

  async validate(payload: any) {
    return {id: payload.id, role: payload.role, username: payload.username}
  }
}