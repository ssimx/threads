import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, effect, Inject, inject, Input, PLATFORM_ID, signal } from '@angular/core';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentType } from '../../types/comment.type';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-comment',
    imports: [CommonModule, CommentFormComponent],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.css',
})
export class CommentComponent {
    @Input() comment!: CommentType;
    isExpanded = signal(false);
    isReplying = signal(false);
    commentService = inject(CommentService);
    userService = inject(UserService);
    nestedComments = signal<CommentType[]>([]);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    nestedCommentsEffect = effect(() => {
        if (this.isExpanded()) {
            this.commentService.getCommentReplies(this.comment.id)
                .subscribe((comments) => {
                    const formattedComms = comments.map((comment) => {
                        return { ...comment, createdAt: new Date(comment.createdAt).toLocaleDateString("en-US") };
                    });

                    this.nestedComments.set(formattedComms);
                })
        }
    })

    commentTrackById = (_index: number, comment: CommentType) => {
        return comment.id;
    };

    toggleExpanded = () => {
        this.isExpanded.set(!this.isExpanded());
    };

    toggleReplying = () => {
        this.isReplying.set(!this.isReplying())

        if (this.isReplying()) {
            this.isExpanded.set(!this.isExpanded());
        }
    };

    createReply(formValues: { content: string }) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const { content } = formValues;
        const user = this.userService.getUserFromCookies();

        if (!user) {
            return;
        }

        this.commentService.createComment({
            content,
            authorId: user.id,
            replyToId: +this.comment.id
        }).subscribe((newComment) => {
            const formattedComment = { ...newComment, createdAt: new Date(newComment.createdAt).toLocaleDateString("en-US") };

            this.nestedComments.set([
                formattedComment,
                ...this.nestedComments(),
            ])
        });
    }
}
