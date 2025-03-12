import type Comment from './comment';
import type Film from './film';

export type NoParamHandler = () => void;
export type FilmControlsHandler = (film: Film) => Promise<void>;
export type CommentDeleteHandler = (comment: Comment) => void;
