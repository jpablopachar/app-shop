import jwt, { JwtPayload } from 'jsonwebtoken';
import { EXPIRETIME, MESSAGES, SECRET_KEY } from '../config/constants';
import { Ijwt } from '../interfaces/jwt';

export class Jwt {
  private secretKey = SECRET_KEY as string;

  public sign (data: Ijwt, expiresIn = EXPIRETIME.H24 as number): string {
    return jwt.sign({ user: data.user }, this.secretKey, {
      expiresIn
    })
  }

  public verify (token: string): JwtPayload | string {
    try {
      return jwt.verify(token, this.secretKey)
    } catch (error) {
      return MESSAGES.TOKEN_VERIFICATION_FAILED
    }
  }
}
