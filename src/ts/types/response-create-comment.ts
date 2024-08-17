import Comment from './comment';
import Movie from './movie';

export type ResponseCreateComment = {
    'movie': Movie,
    'comments': Comment[]
};
