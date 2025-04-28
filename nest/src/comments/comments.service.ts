import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private prisma: PrismaService) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const newComment = await this.prisma.comment.create({
            data: {
                content: createCommentDto.content,
                authorId: createCommentDto.authorId,
                replyToId: createCommentDto.replyToId,
            },
        });

        return newComment;
    }

    async findComment(id: number): Promise<Comment | null> {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id,
            },
        });

        return comment;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
