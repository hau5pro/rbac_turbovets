import { Permission, UserRole } from 'src/infrastructure/enums';

import { Injectable } from '@nestjs/common';
import { RolePermissionsMap } from 'src/infrastructure/permissions/permissions.constants';
import { UserOrgRole } from 'src/db/entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/db/entities/organization.entity';

@Injectable()
export class RbacService {
  constructor(
    @InjectRepository(UserOrgRole)
    private readonly userOrgRoleRepo: Repository<UserOrgRole>,
  ) {}

  async hasPermissionForOrg(
    userId: number,
    targetOrgId: number,
    permissions: Permission[],
  ): Promise<boolean> {
    const userOrgRoles = await this.userOrgRoleRepo.find({
      where: { user: { id: userId } },
      relations: ['organization', 'organization.children'],
    });

    for (const role of userOrgRoles) {
      if (this.includesOrg(role.organization, targetOrgId)) {
        if (this.hasPermissionsForRole(role, permissions)) {
          return true;
        }
      }
    }

    return false;
  }

  private includesOrg(org: Organization, targetOrgId: number): boolean {
    if (org.id === targetOrgId) return true;
    for (const child of org.children ?? []) {
      if (this.includesOrg(child, targetOrgId)) {
        return true;
      }
    }
    return false;
  }

  private hasPermissionsForRole(
    userOrgRole: UserOrgRole,
    permissions: Permission[],
  ): boolean {
    return permissions.every((permission) =>
      this.hasPermission(userOrgRole.role, permission),
    );
  }

  private hasPermission(role: UserRole, permission: Permission): boolean {
    return RolePermissionsMap[role]?.includes(permission) ?? false;
  }
}
