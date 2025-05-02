import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PERMISSIONS, ROLES } from '../decorators';
import { Permission, UserRole } from '../enums';

import { RbacService } from 'src/services/rbac/rbac.service';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from '../interfaces/request-with-user';

@Injectable()
export class RolesGuard implements CanActivate {
  static errorMessages = {
    orgIdRequired: 'Organization ID is required to authorize this request.',
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const roles: UserRole[] = this.reflector.get<UserRole[]>(ROLES, handler);
    const permissions: Permission[] = this.reflector.get<Permission[]>(
      PERMISSIONS,
      handler,
    );

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user.id;
    const orgId = request.body?.orgId;

    if (typeof orgId != 'number') {
      throw new ForbiddenException(RolesGuard.errorMessages.orgIdRequired);
    }

    const hasRole = await this.rbacService.hasPermissionForOrg(
      userId,
      orgId,
      permissions,
    );

    return hasRole;
  }
}
