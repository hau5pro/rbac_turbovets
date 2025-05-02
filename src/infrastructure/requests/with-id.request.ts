import { ApiProperty } from '@nestjs/swagger';

export class WithIdRequest {
  @ApiProperty()
  id: number;
}
