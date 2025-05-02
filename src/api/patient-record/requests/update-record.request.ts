import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRecordRequest {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  diagnosis?: string;

  @ApiPropertyOptional()
  orgId?: number;
}
