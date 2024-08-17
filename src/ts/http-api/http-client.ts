import Movie from '../types/movie';
import Comment from '../types/comment';
import LocalComment from '../types/local-comment';
import CommentCreationResponse from '../types/comment-creation-response';
import MovieAdapter from './adapters/movie-adapter';
import CommentAdapter from './adapters/comment-adapter';
import CommentCreationResponseAdapter from './adapters/comment-creation-response-adapter';
import ResponseError from './errors/response-error';
import { CommentDto, MovieDto } from './dto';
import { RequestMethod, ResponseSuccessStatus, ResponseErrorStatus, ErrorMessage } from './constants';

export default class HttpClient {
    constructor(serverOrigin: string, authorizationString: string) {
        this.serverOrigin = serverOrigin;
        this.authorizationString = authorizationString;
    }

    private serverOrigin: string;
    private authorizationString: string;

    public async readMovies(): Promise<Movie[]> {
        const response = await window.fetch(
            `${this.serverOrigin}/movies`,
            this.getFetchInit(RequestMethod.GET)
        );

        this.checkStatus(response);
        const responseData = await response.json();
        const films = (responseData as MovieDto[]).map((film) => MovieAdapter.fromDto(film));
        return films;
    }

    public async updateMovie(film: Movie): Promise<Movie> {
        const body = JSON.stringify(MovieAdapter.toDto(film));
        const response = await window.fetch(
            `${this.serverOrigin}/movies/${film.id}`,
            this.getFetchInit(RequestMethod.PUT, body)
        );

        this.checkStatus(response);
        const responseData = await response.json();
        const updatedFilm = MovieAdapter.fromDto(responseData);
        return updatedFilm;
    }

    public async readComments(filmId: number): Promise<Comment[]> {
        const response = await window.fetch(
            `${this.serverOrigin}/comments/${filmId}`,
            this.getFetchInit(RequestMethod.GET)
        );

        this.checkStatus(response);
        const responseData = await response.json();
        const comments = (responseData as CommentDto[]).map((comment) => CommentAdapter.fromDto(comment));
        return comments;
    }

    public async createComment(filmId: number, comment: LocalComment): Promise<CommentCreationResponse> {
        const body = JSON.stringify(CommentAdapter.toDto(comment));
        const response = await window.fetch(
            `${this.serverOrigin}/comments/${filmId}`,
            this.getFetchInit(RequestMethod.POST, body)
        );

        this.checkStatus(response);
        const responseData = await response.json();
        const commentCreationResponse = CommentCreationResponseAdapter.fromDto(responseData);
        return commentCreationResponse;
    }

    public async deleteComment(commentId: number): Promise<null> {
        const response = await window.fetch(
            `${this.serverOrigin}/comments/${commentId}`,
            this.getFetchInit(RequestMethod.DELETE)
        );

        this.checkStatus(response);
        return null;
    }

    private getFetchInit(method: RequestMethod, body: string | null = null): RequestInit {
        return {
            method: method,
            mode: 'cors',
            headers: this.getRequestHeaders(method),
            body: body
        };
    }

    private getRequestHeaders(method: RequestMethod): Headers {
        const headers = new Headers();
        headers.set('Authorization', `Basic ${this.authorizationString}`);
        if (method === RequestMethod.POST || method === RequestMethod.PUT) {
            headers.set('Content-Type', 'application/json');
        }
        return headers;
    }

    private checkStatus(response: Response): void {
        if (response.status >= ResponseSuccessStatus.MIN && response.status <= ResponseSuccessStatus.MAX) {
            return;
        } else if (response.status === ResponseErrorStatus.AUTH_ERROR) {
            throw new ResponseError(response.status, ErrorMessage.AUTH_ERROR);
        } else if (response.status === ResponseErrorStatus.NOT_FOUND_ERROR) {
            throw new ResponseError(response.status, ErrorMessage.NOT_FOUND_ERROR);
        } else {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
    }
}
