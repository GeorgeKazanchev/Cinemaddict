import { it, describe, expect } from '@jest/globals';
import { cloneDeep, getMinDate } from '../../src/ts/model';
import { getComments } from '../get-comments';
import { getFilms } from '../get-films';

const films = getFilms();
const comments = getComments();

const checkArraysAreEqual = (array1: unknown[], array2: unknown[]): void => {
  for (let i = 0; i < array1.length; ++i) {
    expect(array2[i]).not.toBe(array1[i]);
    expect(array2[i]).toStrictEqual(array1[i]);
  }
};

describe('Clone deep function', () => {
  it('should clone numbers', () => {
    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep(1000000)).toBe(1000000);
    expect(cloneDeep(0)).toBe(0);
    expect(cloneDeep(-1)).toBe(-1);
    expect(cloneDeep(1.5)).toBe(1.5);
    expect(cloneDeep(Number.EPSILON)).toBe(Number.EPSILON);
    expect(cloneDeep(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
    expect(cloneDeep(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    expect(cloneDeep(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY);
    expect(cloneDeep(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY);
    expect(cloneDeep(Number.NaN)).toBe(Number.NaN);
  });

  it('should clone strings', () => {
    expect(cloneDeep('Hello world!')).toBe('Hello world!');
    expect(cloneDeep('1')).toBe('1');
    expect(cloneDeep('')).toBe('');
  });

  it('should clone booleans', () => {
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(false)).toBe(false);
  });

  it('should clone null', () => {
    expect(cloneDeep(null)).toBe(null);
  });

  it('should clone undefined', () => {
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it('should clone dates', () => {
    const dates = [
      new Date('2020-01-14'),
      new Date('0001-01-01'),
      getMinDate(),
    ];

    const clonedDates = dates.map((date) => cloneDeep(date));
    checkArraysAreEqual(dates, clonedDates);
  });

  it('should clone RegExps', () => {
    const regExps = [
      /[0-9a-z]/ig,
      /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/,
      /./,
    ];

    const clonedRegExps = regExps.map((regExp) => cloneDeep(regExp));
    checkArraysAreEqual(regExps, clonedRegExps);
  });

  it('should clone arrays', () => {
    const arrays = [
      [1, 2, 3, 4, 5],
      ['abc', 'def'],
      ['123', 555, true, null, undefined, 7],
      [true, false],
      [null, undefined, NaN],
      [1],
      [undefined],
      [],
    ];

    const clonedArrays = arrays.map((array) => cloneDeep(array));
    checkArraysAreEqual(arrays, clonedArrays);
  });

  it('should clone nested arrays', () => {
    const arrays = [
      [[1], [2], [3]],
      [['a'], []],
      [[null], [], [123]],
      [[]],
      [[1, [2, 3], 4, 5], [0], ['a', ['b', ['c', ['d', ['e']]]]]],
    ];

    const clonedArrays = arrays.map((array) => cloneDeep(array));
    checkArraysAreEqual(arrays, clonedArrays);
  });

  it('should clone objects', () => {
    const objects = [
      { name: 'John' },
      { name: 'Kate', value: 26 },
      films[0],
      comments[0],
      { isOpen: true },
      { element: null },
      {
        a: 1,
        b: 'string',
        c: false,
        d: undefined,
        e: [1, [2], [[3]]],
      },
    ];

    const clonedObjects = objects.map((obj) => cloneDeep(obj));
    checkArraysAreEqual(objects, clonedObjects);
  });

  it('should clone nested objects', () => {
    const objects = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
                children: [],
              },
            ],
          },
          {
            id: 4,
          },
        ],
      },

      {
        a: 1,
        b: {
          value: 2,
        },
        c: {
          d: {
            value: 3,
          },
        },
      },
    ];

    const clonedObjects = objects.map((obj) => cloneDeep(obj));
    checkArraysAreEqual(objects, clonedObjects);
  });
});
