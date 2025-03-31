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
import type CommentDto from './types/comment-dto';
import type CommentPostResponse from './types/comment-post-response';
import type FilmDto from './types/film-dto';

const SERVER_HOST = '85.119.146.124';
const SERVER_PORT = 8081;
const RANDOM_STRING_LENGTH = 10;

const baseUrl = `http://${SERVER_HOST}:${SERVER_PORT}`;
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

const checkStatus = (response: Response): void => {
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response: Response): Promise<unknown> => response.json();

export default class Api {
  public static async loadFilms(): Promise<Film[]> {
    const response = await fetch(`${baseUrl}/movies`, getFetchOptions());
    checkStatus(response);
    const responseData = await toJSON(response);
    return FilmsAdapter.fromDtos(responseData as FilmDto[]);
  }

  public static async loadComments(filmId: string): Promise<Comment[]> {
    const response = await fetch(`${baseUrl}/comments/${filmId}`, getFetchOptions());
    checkStatus(response);
    const responseData = await toJSON(response);
    return CommentsAdapter.fromDtos(responseData as CommentDto[]);
  }

  public static async updateFilm(film: Film): Promise<Film> {
    const body = JSON.stringify(FilmsAdapter.toDto(film));
    const response = await fetch(
      `${baseUrl}/movies/${film.id}`,
      getFetchOptions(RequestMethod.PUT, body),
    );
    checkStatus(response);
    const responseData = await toJSON(response);
    return FilmsAdapter.fromDto(responseData as FilmDto);
  }

  public static async createComment(
    comment: LocalComment,
    filmId: string,
  ): Promise<[Film, Comment[]]> {
    const body = JSON.stringify(CommentsAdapter.toDto(comment));
    const response = await fetch(
      `${baseUrl}/comments/${filmId}`,
      getFetchOptions(RequestMethod.POST, body),
    );
    checkStatus(response);
    const responseData = await toJSON(response);
    return CommentPostResponseAdapter.fromDto(responseData as CommentPostResponse);
  }

  public static async deleteComment(id: string): Promise<void> {
    const response = await fetch(`${baseUrl}/comments/${id}`, getFetchOptions(RequestMethod.DELETE));
    checkStatus(response);
  }
}
