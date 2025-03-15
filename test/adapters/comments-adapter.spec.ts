import { it, describe, expect } from '@jest/globals';
import CommentsAdapter from '../../src/ts/api/adapters/comments-adapter';
import {
  getDtoComments,
  getDtoLocalComment,
  getComments,
  getLocalComment,
} from '../get-comments';

describe('Comments adapter', () => {
  describe('From DTOs', () => {
    it('should return correct comments', () => {
      const dtos = getDtoComments();
      const expectedComments = getComments();
      expect(CommentsAdapter.fromDtos(dtos)).toStrictEqual(expectedComments);
    });
  });

  describe('From DTO', () => {
    it('should return a correct comment', () => {
      const dto = getDtoComments()[0];
      const expectedComment = getComments()[0];
      expect(CommentsAdapter.fromDto(dto)).toStrictEqual(expectedComment);
    });
  });

  describe('To DTO', () => {
    it('should return a correct local DTO comment', () => {
      const comment = getLocalComment();
      const expectedDto = getDtoLocalComment();
      expect(CommentsAdapter.toDto(comment)).toStrictEqual(expectedDto);
    });
  });
});
