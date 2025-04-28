import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class CreateCommentDto {
    @IsNumberString()
    content: string;

    @IsNumber()
    authorId: number;

    @IsOptional()
    @IsNumber()
    replyToId: number;
}
