import { it, describe, expect } from '@jest/globals';
import getFormattedCommentDate from '../../src/ts/model/get-formatted-comment-date';

describe('Get formatted comment date function', () => {
  it('should return formatted date', () => {
    expect(getFormattedCommentDate(new Date(2020, 0, 1, 0, 0)))
      .toEqual(`2020/01/01 00:00`);
    expect(getFormattedCommentDate(new Date(2020, 0, 1, 0, 10)))
      .toEqual(`2020/01/01 00:10`);
    expect(getFormattedCommentDate(new Date(2020, 0, 1, 10, 0)))
      .toEqual(`2020/01/01 10:00`);
    expect(getFormattedCommentDate(new Date(2020, 0, 10, 0, 0)))
      .toEqual(`2020/01/10 00:00`);
    expect(getFormattedCommentDate(new Date(2020, 5, 1, 0, 0)))
      .toEqual(`2020/06/01 00:00`);
  });
});
