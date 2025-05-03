import { AuthData, RequestWithUser } from 'src/infrastructure/interfaces';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MockAuthGuard implements CanActivate {
  private static mockUser: AuthData | null = null;

  static setMockUser(user: AuthData | null) {
    this.mockUser = user;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    request.user = MockAuthGuard.mockUser!;
    return true;
  }
}
