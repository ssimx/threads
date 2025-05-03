import { UserType } from './user.type';

export type CommentType = {
    id: string,
    content: string,
    author: UserType,
    createdAt: string,
    replyTo: CommentType | null,
};

export type NewCommentType = {
    content: string,
    authorId: number,
    replyToId?: number,
}