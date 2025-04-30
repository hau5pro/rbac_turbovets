import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  validateUser(userId: number): boolean {
    return !!userId; // TODO: hook up to a real auth system
  }
}
