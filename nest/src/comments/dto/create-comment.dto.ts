import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    content: string;

    @IsNumber()
    authorId: number;

    @IsOptional()
    @IsNumber()
    replyToId: number;
}
