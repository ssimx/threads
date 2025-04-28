import { IsEmail, IsNumberString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsNumberString()
    name: string;
}
