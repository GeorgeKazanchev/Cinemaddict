import { it, describe, expect } from '@jest/globals';
import { Rating } from '../../src/ts/model/consts';
import getRatingClassname from '../../src/ts/model/get-rating-classname';

describe('Get rating classname function', () => {
  it('should return correct classnames', () => {
    const baseClassname = 'film-card__rating';
    expect(getRatingClassname(Rating.MAX, baseClassname)).toBe('film-card__rating');
    expect(getRatingClassname(8.5, baseClassname)).toBe('film-card__rating');
    expect(getRatingClassname(Rating.AVERAGE + 0.1, baseClassname)).toBe('film-card__rating');
    expect(getRatingClassname(Rating.AVERAGE, baseClassname)).toBe('film-card__rating film-card__rating--average');
    expect(getRatingClassname(5.0, baseClassname)).toBe('film-card__rating film-card__rating--average');
    expect(getRatingClassname(Rating.POOR + 0.1, baseClassname)).toBe('film-card__rating film-card__rating--average');
    expect(getRatingClassname(Rating.POOR, baseClassname)).toBe('film-card__rating film-card__rating--poor');
    expect(getRatingClassname(1.0, baseClassname)).toBe('film-card__rating film-card__rating--poor');
    expect(getRatingClassname(Rating.MIN + 0.1, baseClassname)).toBe('film-card__rating film-card__rating--poor');
    expect(getRatingClassname(Rating.MIN, baseClassname)).toBe('film-card__rating film-card__rating--poor');
  });

  it('should throw an error if a rating is incorrect', () => {
    expect(() => getRatingClassname(Rating.MIN - 0.1, 'classname')).toThrowError(RangeError);
    expect(() => getRatingClassname(Rating.MAX + 0.1, 'classname')).toThrowError(RangeError);
  });

  it('should throw an error if a base classname have 0 length', () => {
    expect(() => getRatingClassname(Rating.MAX, '')).toThrowError(RangeError);
  });
});
