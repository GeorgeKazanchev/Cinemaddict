import { it, describe, expect } from '@jest/globals';
import { getMinDate } from '../../src/ts/model';

describe('Get min date function', () => {
  it('should return min possible date', () => {
    const minDate = getMinDate();
    expect(minDate.getFullYear()).toBe(-271821);
    expect(minDate.getMonth()).toBe(3);
    expect(minDate.getDate()).toBe(20);
    expect(minDate.getHours()).toBe(2);
    expect(minDate.getMinutes()).toBe(30);
    expect(minDate.getSeconds()).toBe(17);
    expect(minDate.getMilliseconds()).toBe(0);
  });
});
