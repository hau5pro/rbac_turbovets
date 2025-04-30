import { User } from 'src/db/entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
