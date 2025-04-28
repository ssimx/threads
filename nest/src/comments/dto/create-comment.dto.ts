import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNumber()
    authorId: number;

    @IsOptional()
    @IsNumber()
    replyToId: number | null;
}
