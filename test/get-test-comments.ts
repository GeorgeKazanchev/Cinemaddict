import Emotions from '../src/ts/data/emotions';
import { Comment, LocalComment } from '../src/ts/model';
import type CommentDto from '../src/ts/api/types/comment-dto';
import type LocalCommentDto from '../src/ts/api/types/local-comment-dto';

export const getTestComments = (): Comment[] => (
  [
    {
      author: 'RALL',
      date: new Date('1999-12-11T00:00:00.000Z'),
      emotion: Emotions.smile,
      id: '50a689fb-90e9-48f8-937e-8028029b8fe8',

      text: 'This great movie brought out into the open the horrors of heroin addiction. It captured the struggle of a '
      + 'man, Frankie Machine, with a "monkey on his back". Frank Sinatra did his homework, well. The acting is '
      + 'superb, the score is first rate and the actors all gave above average performances. Frank gave one of his '
      + 'best performances. This movie has much to offer.',
    },

    {
      author: 'JamesMovieGuy_117',
      date: new Date('2017-12-24T00:00:00.000Z'),
      emotion: Emotions.angry,
      id: '89a52349-de50-469f-a4b6-ecc19a7fd97a',

      text: 'Martians kidnap Santa Claus due to an elder\'s belief that the Martian children need to experience '
      + 'Christmas and the joys of childhood. This leads to two human children discovering the conspiracy and '
      + 'work to get Santa Claus back by Christmas.',
    },
  ]
);

export const getDtoTestComments = (): CommentDto[] => (
  [
    {
      id: '50a689fb-90e9-48f8-937e-8028029b8fe8',
      author: 'RALL',

      comment: 'This great movie brought out into the open the horrors of heroin addiction. It captured the struggle of a '
      + 'man, Frankie Machine, with a "monkey on his back". Frank Sinatra did his homework, well. The acting is '
      + 'superb, the score is first rate and the actors all gave above average performances. Frank gave one of his '
      + 'best performances. This movie has much to offer.',

      date: '1999-12-11T00:00:00.000Z',
      emotion: 'smile',
    },

    {
      id: '89a52349-de50-469f-a4b6-ecc19a7fd97a',
      author: 'JamesMovieGuy_117',

      comment: 'Martians kidnap Santa Claus due to an elder\'s belief that the Martian children need to experience '
      + 'Christmas and the joys of childhood. This leads to two human children discovering the conspiracy and '
      + 'work to get Santa Claus back by Christmas.',

      date: '2017-12-24T00:00:00.000Z',
      emotion: 'angry',
    },
  ]
);

export const getTestLocalComment = (): LocalComment => (
  {
    date: new Date('1999-12-11T00:00:00.000Z'),
    emotion: 'smile',

    text: 'This great movie brought out into the open the horrors of heroin addiction. It captured the struggle of a '
    + 'man, Frankie Machine, with a "monkey on his back". Frank Sinatra did his homework, well. The acting is '
    + 'superb, the score is first rate and the actors all gave above average performances. Frank gave one of his '
    + 'best performances. This movie has much to offer.',
  }
);

export const getDtoTestLocalComment = (): LocalCommentDto => (
  {
    comment: 'This great movie brought out into the open the horrors of heroin addiction. It captured the struggle of a '
    + 'man, Frankie Machine, with a "monkey on his back". Frank Sinatra did his homework, well. The acting is '
    + 'superb, the score is first rate and the actors all gave above average performances. Frank gave one of his '
    + 'best performances. This movie has much to offer.',

    date: '1999-12-11T00:00:00.000Z',
    emotion: 'smile',
  }
);
