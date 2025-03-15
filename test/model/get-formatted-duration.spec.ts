import { it, describe, expect } from '@jest/globals';
import { getFormattedDuration } from '../../src/ts/model';

describe('Get formatted duration function', () => {
  it('should return ...m when the duration < 1 hour', () => {
    expect(getFormattedDuration(0)).toBe('0m');
    expect(getFormattedDuration(1)).toBe('1m');
    expect(getFormattedDuration(10)).toBe('10m');
    expect(getFormattedDuration(59)).toBe('59m');
  });

  it('should return ...h ...m when the duration >= 1 hour', () => {
    expect(getFormattedDuration(60)).toBe('1h 0m');
    expect(getFormattedDuration(61)).toBe('1h 1m');
    expect(getFormattedDuration(70)).toBe('1h 10m');
    expect(getFormattedDuration(123)).toBe('2h 3m');
  });

  it('should correctly deals with non-integer values', () => {
    expect(getFormattedDuration(0.1)).toBe('0m');
    expect(getFormattedDuration(0.5)).toBe('0m');
    expect(getFormattedDuration(1.9)).toBe('1m');
    expect(getFormattedDuration(123.4)).toBe('2h 3m');
    expect(getFormattedDuration(119.9)).toBe('1h 59m');
  });

  it('should throw an error if the duration is negative', () => {
    expect(() => getFormattedDuration(-0.1)).toThrowError(RangeError);
    expect(() => getFormattedDuration(-1)).toThrowError(RangeError);
    expect(() => getFormattedDuration(-60)).toThrowError(RangeError);
  });
});
