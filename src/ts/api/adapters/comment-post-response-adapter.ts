import { Comment, Film } from '../../model';
import CommentsAdapter from './comments-adapter';
import FilmsAdapter from './films-adapter';
import type CommentPostResponse from '../types/comment-post-response';

export default class CommentPostResponseAdapter {
  public static fromDto({ film, comments }: CommentPostResponse): [Film, Comment[]] {
    return [
      FilmsAdapter.fromDto(film),
      CommentsAdapter.fromDtos(comments),
    ];
  }
}
