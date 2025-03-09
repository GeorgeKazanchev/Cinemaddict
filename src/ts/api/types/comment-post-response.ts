import CommentDto from './comment-dto';
import FilmDto from './film-dto';

type CommentPostResponse = {
  comments: CommentDto[];
  film: FilmDto;
};

export default CommentPostResponse;
