import { it, describe, expect } from '@jest/globals';
import getRank from '../../src/ts/model/get-rank';

describe('Get rank function', () => {
  it('should return an empty string if films === 0', () => {
    expect(getRank(0)).toEqual('');
  });

  it('should return some rank if films > 0', () => {
    expect(getRank(1)).toEqual('novice');
    expect(getRank(10)).toEqual('novice');
    expect(getRank(11)).toEqual('fan');
    expect(getRank(20)).toEqual('fan');
    expect(getRank(21)).toEqual('movie buff');
    expect(getRank(100)).toEqual('movie buff');
  });

  it('should throw an error if films count is negative', () => {
    expect(() => getRank(-1)).toThrowError();
  });

  it('should throw an error if films count is not integer', () => {
    expect(() => getRank(0.1)).toThrowError();
    expect(() => getRank(0.5)).toThrowError();
    expect(() => getRank(1.2)).toThrowError();
    expect(() => getRank(-0.1)).toThrowError();
  });
});
