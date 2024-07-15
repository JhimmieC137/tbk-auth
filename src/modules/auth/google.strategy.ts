import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';

import { Injectable } from '@nestjs/common';
import { baseConfig } from 'src/settings/base.config';

config();
const baseConfigs = baseConfig()  

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: baseConfigs.oauth_client,
            clientSecret: baseConfigs.oauth_secret,
            callbackURL: baseConfigs.baseUrl + '/api/v1/auth/Oauth/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails, photos } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }
}