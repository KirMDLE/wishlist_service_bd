import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export function PubDTO() {
  return applyDecorators(
    ApiProperty({
      name: 'publicId',
      example: 'impossible_player',
      description: `user's public id such as @impossible_player. P.S. do not add @ to the public id`,
    }),
    IsNotEmpty(),
    IsString(),
    Length(4, 30, {
      message: 'public id must be between 4 and 30 characters long',
    }),
    Matches(/^[a-zA-Z0-9_]+$/, {
      message: 'public id can contain only alphanumeric characters and _',
    })
  );
}

export class PublicIdDto {
  @PubDTO()
  publDTO: string;
}