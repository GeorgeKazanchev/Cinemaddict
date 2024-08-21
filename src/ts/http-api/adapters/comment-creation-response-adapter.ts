import CommentCreationResponse from '../../types/comment-creation-response';
import MovieAdapter from './movie-adapter';
import CommentAdapter from './comment-adapter';
import { CommentCreationResponseDto } from '../dto';

export default class CommentCreationResponseAdapter {
    public static fromDto(responseData: CommentCreationResponseDto): CommentCreationResponse {
        const film = MovieAdapter.fromDto(responseData['movie']);
        const comments = responseData['comments'].map((comment) => CommentAdapter.fromDto(comment));

        return new CommentCreationResponse(
            film,
            comments
        );
    }
}
