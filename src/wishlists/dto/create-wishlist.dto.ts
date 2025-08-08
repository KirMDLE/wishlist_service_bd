import { IsBoolean, IsString, IsOptional } from 'class-validator';



export class CreateWishlistDto {
  @IsString()
  title: string;


  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  isPublic: boolean;


}