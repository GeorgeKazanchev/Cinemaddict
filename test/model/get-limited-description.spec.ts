import { it, describe, expect } from '@jest/globals';
import { MAX_DESCRIPTION_LENGTH, ELLIPSIS } from '../../src/ts/model/consts';
import getLimitedDescription from '../../src/ts/model/get-limited-description';

describe('Get limited description function', () => {
  it('should return an empty description if the length === 0', () => {
    expect(getLimitedDescription('')).toEqual('');
  });

  it('should return the original description if the length < MAX', () => {
    const description = 'Lorem';
    expect(getLimitedDescription(description)).toEqual(description);
  });

  it('should return the original description if the length === MAX', () => {
    const description = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et ma`;
    expect(getLimitedDescription(description)).toEqual(description);
  });

  it('should return the description with ellipsis if the length > MAX', () => {
    const description = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p`;
    const result = expect(getLimitedDescription(description));
    result.toHaveLength(MAX_DESCRIPTION_LENGTH);
    result.toMatch(new RegExp(`${ELLIPSIS}$`));
  });
});
