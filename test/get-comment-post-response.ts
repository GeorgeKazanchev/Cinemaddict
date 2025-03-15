import { Comment, Film } from '../src/ts/model';
import { getDtoComments, getComments } from './get-comments';
import { getDtoFilms, getFilms } from './get-films';
import type CommentPostResponse from '../src/ts/api/types/comment-post-response';

const films = getFilms();
const filmDtos = getDtoFilms();
const comments = getComments();
const commentDtos = getDtoComments();

export const getCommentPostResponse = (): [Film, Comment[]] => [
  films[0],
  [comments[0]],
];

export const getDtoCommentPostResponse = (): CommentPostResponse => (
  {
    film: filmDtos[0],
    comments: [commentDtos[0]],
  }
);
