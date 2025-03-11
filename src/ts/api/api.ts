import {
  getRandomString,
  Film,
  Comment,
  LocalComment,
} from '../model';
import CommentPostResponseAdapter from './adapters/comment-post-response-adapter';
import CommentsAdapter from './adapters/comments-adapter';
import FilmsAdapter from './adapters/films-adapter';
import RequestMethod from './enums/request-method';

const SERVER_PORT = 8081;
const RANDOM_STRING_LENGTH = 10;

const baseUrl = `http://localhost:${SERVER_PORT}`;
const authHeader = `Basic ${getRandomString(RANDOM_STRING_LENGTH)}`;

const getRequestHeaders = (method: RequestMethod): Headers => {
  const headers = new Headers();
  headers.set('Authorization', authHeader);
  if (method === RequestMethod.POST || method === RequestMethod.PUT) {
    headers.set('Content-Type', 'application/json');
  }
  return headers;
};

const getFetchOptions = (
  method: RequestMethod = RequestMethod.GET,
  body: string | null = null,
): RequestInit => (
  {
    method,
    body,
    headers: getRequestHeaders(method),
  }
);

const checkStatus = (response: Response): Response => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

//  eslint-disable-next-line @typescript-eslint/no-explicit-any
const toJSON = (response: Response): Promise<any> => response.json();

export default class Api {
  public static loadFilms(): Promise<Film[]> {
    return fetch(`${baseUrl}/movies`, getFetchOptions())
      .then(checkStatus)
      .then(toJSON)
      .then(FilmsAdapter.fromDtos);
  }

  public static loadComments(filmId: string): Promise<Comment[]> {
    return fetch(`${baseUrl}/comments/${filmId}`, getFetchOptions())
      .then(checkStatus)
      .then(toJSON)
      .then(CommentsAdapter.fromDtos);
  }

  public static updateFilm(film: Film): Promise<Film> {
    const body = JSON.stringify(FilmsAdapter.toDto(film));
    return fetch(
      `${baseUrl}/movies/${film.id}`,
      getFetchOptions(RequestMethod.PUT, body),
    )
      .then(checkStatus)
      .then(toJSON)
      .then(FilmsAdapter.fromDto);
  }

  public static createComment(comment: LocalComment, filmId: string): Promise<[Film, Comment[]]> {
    const body = JSON.stringify(CommentsAdapter.toDto(comment));
    return fetch(
      `${baseUrl}/comments/${filmId}`,
      getFetchOptions(RequestMethod.POST, body),
    )
      .then(checkStatus)
      .then(toJSON)
      .then(CommentPostResponseAdapter.fromDto);
  }

  public static deleteComment(id: string): Promise<void> {
    return fetch(`${baseUrl}/comments/${id}`, getFetchOptions(RequestMethod.DELETE))
      .then(checkStatus)
      .then(() => Promise.resolve());
  }
}
