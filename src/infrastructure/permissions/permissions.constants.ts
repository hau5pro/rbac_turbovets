import { Permission } from '../enums/permissions.enum';
import { UserRole } from '../enums/user-role.enum';

export const RolePermissionsMap: Record<UserRole, Permission[]> = {
  [UserRole.OWNER]: [
    Permission.READ,
    Permission.WRITE,
    Permission.DELETE,
    Permission.AUDIT,
  ],
  [UserRole.ADMIN]: [Permission.READ, Permission.WRITE],
  [UserRole.VIEWER]: [Permission.READ],
};
