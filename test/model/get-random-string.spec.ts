import { it, describe, expect } from '@jest/globals';
import { getRandomString } from '../../src/ts/model';

describe('Get random string function', () => {
  it('should return a random string with the specific length', () => {
    expect(getRandomString(1)).toHaveLength(1);
    expect(getRandomString(2)).toHaveLength(2);
    expect(getRandomString(5)).toHaveLength(5);
    expect(getRandomString(10)).toHaveLength(10);
    expect(getRandomString(100)).toHaveLength(100);
    expect(getRandomString(1000)).toHaveLength(1000);
  });

  it('should throw an error for an empty string', () => {
    expect(() => getRandomString(0)).toThrowError(RangeError);
  });

  it('should throw an error for a string with the negative length', () => {
    expect(() => getRandomString(-1)).toThrowError(RangeError);
    expect(() => getRandomString(-10)).toThrowError(RangeError);
  });

  it('should throw an error for a string with the non-integer length', () => {
    expect(() => getRandomString(1.5)).toThrowError(RangeError);
    expect(() => getRandomString(0.1)).toThrowError(RangeError);
    expect(() => getRandomString(-0.1)).toThrowError(RangeError);
  });
});
