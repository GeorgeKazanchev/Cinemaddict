import { it, describe, expect } from '@jest/globals';
import getDurationComponents from '../../src/ts/model/get-duration-components';

describe('Get duration components function', () => {
  it('should return 0 hours when the duration < 1 hour', () => {
    expect(getDurationComponents(0)).toEqual({ hours: 0, minutes: 0 });
    expect(getDurationComponents(1)).toEqual({ hours: 0, minutes: 1 });
    expect(getDurationComponents(10)).toEqual({ hours: 0, minutes: 10 });
    expect(getDurationComponents(59)).toEqual({ hours: 0, minutes: 59 });
  });

  it('should return hours and minutes when the duration >= 1 hour', () => {
    expect(getDurationComponents(60)).toEqual({ hours: 1, minutes: 0 });
    expect(getDurationComponents(61)).toEqual({ hours: 1, minutes: 1 });
    expect(getDurationComponents(70)).toEqual({ hours: 1, minutes: 10 });
    expect(getDurationComponents(123)).toEqual({ hours: 2, minutes: 3 });
  });

  it('should correctly deals with non-integer values', () => {
    expect(getDurationComponents(0.1)).toEqual({ hours: 0, minutes: 0 });
    expect(getDurationComponents(0.5)).toEqual({ hours: 0, minutes: 0 });
    expect(getDurationComponents(1.9)).toEqual({ hours: 0, minutes: 1 });
    expect(getDurationComponents(123.4)).toEqual({ hours: 2, minutes: 3 });
    expect(getDurationComponents(119.9)).toEqual({ hours: 1, minutes: 59 });
  });

  it('should throw an error if the duration is negative', () => {
    expect(() => getDurationComponents(-0.1)).toThrowError();
    expect(() => getDurationComponents(-1)).toThrowError();
    expect(() => getDurationComponents(-60)).toThrowError();
  });
});
