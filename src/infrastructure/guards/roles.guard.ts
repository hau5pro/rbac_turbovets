import { CanActivate, ExecutionContext } from '@nestjs/common';

import { ROLES } from '../decorators';
import { RbacService } from 'src/services/rbac/rbac.service';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enums';

export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rbacService: RbacService,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const roles: UserRole[] = this.reflector.get(ROLES, handler);

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

    const hasRole = await this.rbacService.hasPermissionForOrg;
  }
}
