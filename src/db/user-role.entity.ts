import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Organization } from './organization.entity';
import { User } from './user.entity';
import { UserRole } from '../infrastructure/enums/user-role.enum';

@Entity()
export class UserOrgRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @ManyToOne(() => Organization)
  organization: Organization;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;
}
