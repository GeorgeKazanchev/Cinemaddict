import { it, describe, expect } from '@jest/globals';
import getFormattedDuration from '../../src/ts/model/get-formatted-duration';

describe('Get formatted duration function', () => {
  it('should return "minutes" string only when duration < 1 hour', () => {
    expect(getFormattedDuration(0)).toEqual('0m');
    expect(getFormattedDuration(1)).toEqual('1m');
    expect(getFormattedDuration(10)).toEqual('10m');
    expect(getFormattedDuration(59)).toEqual('59m');
  });

  it('should return "hours & minutes" string when duration >= 1 hour', () => {
    expect(getFormattedDuration(60)).toEqual('1h 0m');
    expect(getFormattedDuration(61)).toEqual('1h 1m');
    expect(getFormattedDuration(70)).toEqual('1h 10m');
    expect(getFormattedDuration(123)).toEqual('2h 3m');
  });

  it('should correctly deals with non-integer values', () => {
    expect(getFormattedDuration(0.1)).toEqual('0m');
    expect(getFormattedDuration(0.5)).toEqual('0m');
    expect(getFormattedDuration(1.9)).toEqual('1m');
    expect(getFormattedDuration(123.4)).toEqual('2h 3m');
    expect(getFormattedDuration(119.9)).toEqual('1h 59m');
  });

  it('should throw an error if duration is negative', () => {
    expect(() => getFormattedDuration(-0.1)).toThrowError();
    expect(() => getFormattedDuration(-1)).toThrowError();
    expect(() => getFormattedDuration(-60)).toThrowError();
  });
});
