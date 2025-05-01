import { Request } from 'express';
import { User } from 'src/db/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
  body: {
    orgId: number;
    [key: string]: any;
  };
}
