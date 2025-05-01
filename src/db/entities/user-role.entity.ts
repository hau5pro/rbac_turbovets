import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Organization } from './organization.entity';
import { User } from './user.entity';
import { UserRole } from 'src/infrastructure/enums';

@Entity()
export class UserOrgRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  orgId: number;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId ' })
  organization: Organization;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;
}
