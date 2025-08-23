import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenHeaders {
  @ApiProperty({
    name: 'authorization',
    example: 'Bearer <token>',
  })
  @IsNotEmpty()
  authorization: string;
}
