import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CommentType, NewCommentType } from '../types/comment.type';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    http = inject(HttpClient);

    getComments = () => {
        return this.http.get<CommentType[]>(`${environment.apiBaseUrl}/comments`);
    }

    getComment = (parentId: string = '') => {
        return this.http.get<CommentType>(`${environment.apiBaseUrl}/comments/${parentId}`);
    }

    getCommentReplies = (parentId: string = '') => {
        return this.http.get<CommentType[]>(`${environment.apiBaseUrl}/comments/${parentId}?replies=true`);
    }

    createComment = (comment: NewCommentType) => {
        console.log(comment)
        return this.http.post<CommentType>(`${environment.apiBaseUrl}/comments`, comment)
    }
}
