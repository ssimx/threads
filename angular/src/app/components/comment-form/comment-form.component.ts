import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-comment-form',
    imports: [CommonModule],
    templateUrl: './comment-form.component.html',
    styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
    @Input() placeholder = 'Write something...';
    @Input() buttonText = 'Create';
    @Output() submittedForm = new EventEmitter<{
        content: string;
    }>();

    formSubmit($event: SubmitEvent) {
        $event.preventDefault();
        
        const form = $event.target as HTMLFormElement;
        const comment = form.elements.namedItem('commentText') as HTMLTextAreaElement;
        const commentText = comment.value;
        form.reset();

        this.submittedForm.emit({
            content: commentText
        });
    }
}
