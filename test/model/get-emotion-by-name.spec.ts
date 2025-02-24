import { it, describe, expect } from '@jest/globals';
import EmotionType from '../../src/ts/model/enums/emotion-type';
import getEmotionByName from '../../src/ts/model/get-emotion-by-name';

describe('Get emotion by name function', () => {
  it('should return existing emotion', () => {
    expect(getEmotionByName('angry').type).toBe(EmotionType.Angry);
    expect(getEmotionByName('puke').type).toBe(EmotionType.Puke);
    expect(getEmotionByName('sleeping').type).toBe(EmotionType.Sleeping);
    expect(getEmotionByName('smile').type).toBe(EmotionType.Smile);
  });

  it('should throw an error with an incorrect emotion name', () => {
    expect(() => getEmotionByName('fear')).toThrowError();
    expect(() => getEmotionByName('123')).toThrowError();
    expect(() => getEmotionByName('')).toThrowError();
  });
});
