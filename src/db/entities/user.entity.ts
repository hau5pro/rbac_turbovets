import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserOrgRole } from './user-role.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => UserOrgRole, (ur) => ur.user)
  roles: UserOrgRole[];
}
