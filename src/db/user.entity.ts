import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { UserOrgRole } from './user-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => UserOrgRole, (ur) => ur.user)
  roles: UserOrgRole[];
}
