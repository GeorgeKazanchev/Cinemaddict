import CommentCreationResponse from '../../types/comment-creation-response';
import MovieAdapter from './movie-adapter';
import CommentAdapter from './comment-adapter';
import { CommentCreationResponseDto } from '../dto';

export default class CommentCreationResponseAdapter {
    public static fromDto(createdComment: CommentCreationResponseDto): CommentCreationResponse {
        const film = MovieAdapter.fromDto(createdComment['movie']);
        const comments = createdComment['comments'].map((comment) => CommentAdapter.fromDto(comment));

        return new CommentCreationResponse(
            film,
            comments
        );
    }
}
