import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Organization } from './organization.entity';
import { User } from './user.entity';

@Entity()
export class PatientRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  diagnosis: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToOne(() => User)
  createdBy: User;
}
