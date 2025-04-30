import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (org) => org.children, { nullable: true })
  parent: Organization | null;

  @OneToMany(() => Organization, (org) => org.parent)
  children: Organization[];
}
