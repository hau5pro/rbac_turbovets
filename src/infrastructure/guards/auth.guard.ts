import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from 'src/api/auth/auth.service';
import { MOCK_ADMIN } from 'src/test/mocks/mock-data';
import { RequestWithUser } from '../interfaces/request-with-user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    // TODO: Replace with real authentication logic to populate user from request
    request.user = MOCK_ADMIN;

    return this.authService.validateUser(request.user.id);
  }
}
