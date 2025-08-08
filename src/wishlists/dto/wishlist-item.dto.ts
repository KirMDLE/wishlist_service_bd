import { IsBoolean, IsOptional, IsString } from "class-validator";


export class WishlistItemDto {

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsBoolean()
    isPublic?: boolean;

}