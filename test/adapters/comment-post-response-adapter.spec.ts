import { it, describe, expect } from '@jest/globals';
import CommentPostResponseAdapter from '../../src/ts/api/adapters/comment-post-response-adapter';
import { getDtoTestCommentPostResponse, getTestCommentPostResponse } from '../get-test-comment-post-response';

describe('Comment post response adapter', () => {
  describe('From DTO', () => {
    it('should return a film and an array of comments', () => {
      const dto = getDtoTestCommentPostResponse();
      const expectedResponse = getTestCommentPostResponse();
      expect(CommentPostResponseAdapter.fromDto(dto)).toStrictEqual(expectedResponse);
    });
  });
});
