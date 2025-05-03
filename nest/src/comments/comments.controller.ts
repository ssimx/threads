import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto) {
        const comment = await this.commentsService.create(createCommentDto);
        return comment;
    }

    @Get('')
    async getAllComments() {
        const comments = await this.commentsService.getAllComments();
        return comments;
    }

    @Get(':id')
    async getComment(
        @Param('id') id: string,
        @Query() queryParams: { replies: 'true' },
    ) {
        if (queryParams.replies === 'true') {
            const replies = await this.commentsService.getCommentReplies(+id);
            return replies;
        }

        const comment = await this.commentsService.getComment(+id);
        return comment;
    }
}
