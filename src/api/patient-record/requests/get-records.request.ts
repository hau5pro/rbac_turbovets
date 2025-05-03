import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetRecordsRequest {
  @ApiProperty()
  orgId: number;

  @ApiPropertyOptional()
  limit?: number;
}
