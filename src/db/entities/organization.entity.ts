import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity()
export class Organization extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  parentOrgId: number | null;

  @ManyToOne(() => Organization, { nullable: true })
  @JoinColumn({ name: 'parentOrgId' })
  parent: Organization | null;

  @OneToMany(() => Organization, (org) => org.parentOrgId)
  children: Organization[];
}
