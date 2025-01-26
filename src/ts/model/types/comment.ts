import type Emotion from './emotion';

type Comment = {
  author: string;
  date: Date;
  emotion: Emotion;
  id: string;
  text: string;
};

export default Comment;
