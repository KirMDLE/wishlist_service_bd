import { IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  take?: number = 10;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  skip?: number = 0; 
  @IsOptional()
  orderBy?: string = 'createdAt';
  @IsOptional()
  orderDirection?: 'ASC' | 'DESC' = 'DESC';}