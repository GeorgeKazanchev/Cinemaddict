import { Comment, Film } from '../src/ts/model';
import { getDtoTestComments, getTestComments } from './get-test-comments';
import { getDtoTestFilms, getTestFilms } from './get-test-films';
import type CommentPostResponse from '../src/ts/api/types/comment-post-response';

const films = getTestFilms();
const filmDtos = getDtoTestFilms();
const comments = getTestComments();
const commentDtos = getDtoTestComments();

export const getTestCommentPostResponse = (): [Film, Comment[]] => [
  films[0],
  [comments[0]],
];

export const getDtoTestCommentPostResponse = (): CommentPostResponse => (
  {
    film: filmDtos[0],
    comments: [commentDtos[0]],
  }
);
