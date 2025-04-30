import { Permission } from '../enums';
import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS = 'permissions';
export const Permissions = (...permissions: Permission[]) => {
  SetMetadata(PERMISSIONS, permissions);
};
