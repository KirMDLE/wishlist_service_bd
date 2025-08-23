import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserProfileDto extends User {
	@ApiProperty({
	})
	@IsOptional() 
	description: string;
}