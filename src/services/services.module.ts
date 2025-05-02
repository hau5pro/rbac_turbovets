import { User, UserOrgRole } from 'src/db/entities';

import { Module } from '@nestjs/common';
import { RbacService } from './rbac/rbac.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserOrgRole])],
  providers: [RbacService, UserService],
  exports: [RbacService, UserService],
})
export class ServicesModule {}
