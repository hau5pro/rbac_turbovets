import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { Organization } from './organization.entity';

@Entity()
export class PatientRecord extends BaseEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  diagnosis: string;

  @ApiProperty()
  @Column()
  orgId: number;

  @ManyToOne(() => Organization)
  @JoinColumn({ name: 'orgId' })
  organization: Organization;
}
