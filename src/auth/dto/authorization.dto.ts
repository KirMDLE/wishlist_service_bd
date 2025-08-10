import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserAuthorizationDto {
    @IsEmail({}, {message: 'email must be valid'})
    @IsNotEmpty({ message: 'email is required'})
    email: string

    @IsString()
    @IsNotEmpty({message: 'pass is required'})
    password:string
}