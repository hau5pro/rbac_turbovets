import { AuthData } from './auth-data';
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: AuthData;
  body: {
    orgId: number;
    [key: string]: any;
  };
}
