import Emotions from '../data/emotions';
import type Emotion from './types/emotion';

const getEmotionByName = (emotionName: string): Emotion => {
  switch (emotionName) {
    case 'angry':
      return Emotions.angry;
    case 'puke':
      return Emotions.puke;
    case 'sleeping':
      return Emotions.sleeping;
    case 'smile':
      return Emotions.smile;
    default:
      throw new RangeError(`Emotion ${emotionName} does not exist`);
  }
};

export default getEmotionByName;
