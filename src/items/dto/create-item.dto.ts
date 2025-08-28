import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}