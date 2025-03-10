import { Comment, getEmotionByName, LocalComment } from '../../model';
import CommentDto from '../types/comment-dto';
import LocalCommentDto from '../types/local-comment-dto';

export default class CommentsAdapter {
  public static fromDtos(dtos: CommentDto[]): Comment[] {
    return dtos.map((dto) => CommentsAdapter.fromDto(dto));
  }

  public static fromDto(dto: CommentDto): Comment {
    return {
      author: dto.author,
      date: new Date(dto.date),
      emotion: getEmotionByName(dto.emotion),
      id: dto.id,
      text: dto.comment,
    };
  }

  public static toDto(comment: LocalComment): LocalCommentDto {
    return {
      comment: comment.text,
      date: comment.date.toISOString(),
      emotion: comment.emotion.type.toLowerCase(),
    };
  }
}
