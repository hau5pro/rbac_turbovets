import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  diagnosis: string;

  @ApiProperty()
  orgId: number;
}
