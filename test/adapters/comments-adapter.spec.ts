import { it, describe, expect } from '@jest/globals';
import CommentsAdapter from '../../src/ts/api/adapters/comments-adapter';
import {
  getDtoTestComments,
  getDtoTestLocalComment,
  getTestComments,
  getTestLocalComment,
} from '../get-test-comments';

describe('Comments adapter', () => {
  describe('From DTOs', () => {
    it('should return correct comments', () => {
      const dtos = getDtoTestComments();
      const expectedComments = getTestComments();
      expect(CommentsAdapter.fromDtos(dtos)).toStrictEqual(expectedComments);
    });
  });

  describe('From DTO', () => {
    it('should return a correct comment', () => {
      const dto = getDtoTestComments()[0];
      const expectedComment = getTestComments()[0];
      expect(CommentsAdapter.fromDto(dto)).toStrictEqual(expectedComment);
    });
  });

  describe('To DTO', () => {
    it('should return a correct local DTO comment', () => {
      const comment = getTestLocalComment();
      const expectedDto = getDtoTestLocalComment();
      expect(CommentsAdapter.toDto(comment)).toStrictEqual(expectedDto);
    });
  });
});
