import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
