import type Emotion from './emotion';

type LocalComment = {
  date: Date;
  emotion: Emotion;
  text: string;
};

export default LocalComment;
