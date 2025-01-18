import { it, describe, expect } from '@jest/globals';
import { monthNames } from '../../src/ts/model/consts';
import getFormattedReleaseDate from '../../src/ts/model/get-formatted-release-date';

describe('Get formatted release date function', () => {
  it('should return formatted date', () => {
    expect(getFormattedReleaseDate(new Date(2020, 0, 1)))
      .toEqual(`01 ${monthNames[0]} 2020`);
    expect(getFormattedReleaseDate(new Date(2020, 1, 1)))
      .toEqual(`01 ${monthNames[1]} 2020`);
    expect(getFormattedReleaseDate(new Date(2020, 0, 10)))
      .toEqual(`10 ${monthNames[0]} 2020`);
    expect(getFormattedReleaseDate(new Date(2020, 5, 10)))
      .toEqual(`10 ${monthNames[5]} 2020`);
  });
});
