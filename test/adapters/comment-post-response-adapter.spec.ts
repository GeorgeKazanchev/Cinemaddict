import { it, describe, expect } from '@jest/globals';
import CommentPostResponseAdapter from '../../src/ts/api/adapters/comment-post-response-adapter';
import { getDtoCommentPostResponse, getCommentPostResponse } from '../get-comment-post-response';

describe('Comment post response adapter', () => {
  describe('From DTO', () => {
    it('should return a film and an array of comments', () => {
      const dto = getDtoCommentPostResponse();
      const expectedResponse = getCommentPostResponse();
      expect(CommentPostResponseAdapter.fromDto(dto)).toStrictEqual(expectedResponse);
    });
  });
});
