import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponseDto extends OmitType(User, ['password'] as const) {
  @ApiProperty({ example: 'Bob Smith' })
  fullName: string;
}