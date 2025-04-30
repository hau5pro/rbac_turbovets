import { Module } from '@nestjs/common';
import { RbacService } from './rbac/rbac.service';
import { UserService } from './user/user.service';

@Module({
  providers: [RbacService, UserService],
  exports: [RbacService, UserService],
})
export class ServicesModule {}
