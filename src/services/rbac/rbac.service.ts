import { Permission, UserRole } from 'src/infrastructure/enums';

import { Injectable } from '@nestjs/common';
import { RolePermissionsMap } from 'src/infrastructure/permissions/permissions.constants';
import { UserOrgRole } from 'src/db/entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(UserOrgRole)
    private readonly userOrgRoleRepo: Repository<UserOrgRole>,
  ) {}

  async hasPermissionForOrg(
    userId: number,
    orgId: number,
    permissions: Permission[],
  ): Promise<boolean> {
    const userRole = await this.getUserRoleForOrg(userId, orgId);
    if (!userRole) {
      return false;
    }

    return permissions.every((permission) => {
      return this.hasPermission(userRole, permission);
    });
  }

  private async getUserRoleForOrg(
    userId: number,
    orgId: number,
  ): Promise<UserRole | null> {
    const userOrgRole = await this.userOrgRoleRepo.findOne({
      where: {
        user: {
          id: userId,
        },
        organization: { id: orgId },
      },
      relations: ['user', 'organization'],
    });

    return userOrgRole ? userOrgRole.role : null;
  }

  private hasPermission(role: UserRole, permission: Permission): boolean {
    return RolePermissionsMap[role]?.includes(permission) ?? false;
  }
}
