import Comment from '../types/comment';
import LocalComment from '../types/local-comment';
import { CommentDto, LocalCommentDto } from '../types/dto';

export default class CommentAdapter {
    public static fromDto(commentDto: CommentDto): Comment {
        return new Comment(
            commentDto['id'],
            commentDto['author'],
            commentDto['comment'],
            new Date(commentDto['date']),
            commentDto['emotion']
        );
    }

    public static toDto(comment: LocalComment): LocalCommentDto {
        return {
            'comment': comment.comment,
            'date': comment.date,
            'emotion': comment.emotion
        };
    }
}
