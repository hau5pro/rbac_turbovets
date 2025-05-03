import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserOrgRole } from './user-role.entity';

@Entity()
export class Organization extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  parentOrgId: number | null;

  @ManyToOne(() => Organization, (org) => org.children, { nullable: true })
  @JoinColumn({ name: 'parentOrgId' })
  parent: Organization | null;

  @OneToMany(() => Organization, (org) => org.parent)
  children: Organization[];

  @OneToMany(() => UserOrgRole, (userOrgRole) => userOrgRole.organization)
  userOrgRoles: UserOrgRole[];
}
