import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
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
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
                replyTo: true,
            },
        });

        return newComment;
    }

    async getAllComments(): Promise<Comment[] | null> {
        const comments = await this.prisma.comment.findMany({
            where: {
                replyToId: null,
            },
            take: 20,
        });

        return comments;
    }

    async getComment(id: number): Promise<Comment | null> {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id,
            },
        });

        return comment;
    }

    async getCommentReplies(id: number): Promise<Comment[] | null> {
        const replies = await this.prisma.comment.findMany({
            where: {
                replyToId: id,
            },
        });

        return replies;
    }
}
