import { Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { CommentService } from '../services/comment.service';
import { CommentType } from '../types/comment.type';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CommentFormComponent } from "../components/comment-form/comment-form.component";
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    imports: [CommentComponent, CommonModule, CommentFormComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    commentService = inject(CommentService);
    userService = inject(UserService);
    comments = signal<CommentType[]>([]);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        this.getComments();
    }

    commentTrackById = (_index: number, comment: CommentType) => {
        return comment.id;
    };

    getComments() {
        this.commentService.getComments()
            .subscribe((comms) => {
                const formattedComms = comms.map((comment) => {
                    return { ...comment, createdAt: new Date(comment.createdAt).toLocaleDateString("en-US") };
                });

                this.comments.set(formattedComms);
            })
    }

    createComment(formValues: { content: string }) {
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
        }).subscribe((newComment) => {
            const formattedComment = { ...newComment, createdAt: new Date(newComment.createdAt).toLocaleDateString("en-US") };

            this.comments.set([
                formattedComment,
                ...this.comments(),
            ])
        });
    }
}
