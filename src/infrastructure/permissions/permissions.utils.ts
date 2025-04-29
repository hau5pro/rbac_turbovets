import { Permission } from '../enums/permissions.enum';
import { RolePermissionsMap } from './permissions.constants';
import { UserRole } from '../enums/user-role.enum';

export class PermissionsUtils {
  static hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
    return permissions.every((permission) =>
      PermissionsUtils.hasPermission(role, permission),
    );
  }

  static hasPermission(role: UserRole, permission: Permission): boolean {
    return RolePermissionsMap[role]?.includes(permission) ?? false;
  }

  static getPermissions(role: UserRole): Permission[] {
    return RolePermissionsMap[role] ?? [];
  }
}
