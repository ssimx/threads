import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto) {
        const comment = await this.commentsService.create(createCommentDto);

        return {
            sucess: true,
            data: comment,
        };
    }

    @Get(':id')
    async findComment(@Param('id') id: string) {
        const comment = await this.commentsService.findComment(+id);

        return {
            success: true,
            data: comment,
        };
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentsService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentsService.remove(+id);
    }
}
