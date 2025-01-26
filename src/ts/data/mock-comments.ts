import Emotions from './emotions';
import type Comment from '../model/types/comment';

const comments: Comment[] = [
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
    author: 'bull-frog',
    date: new Date('2008-04-04T00:00:00.000Z'),
    emotion: Emotions.smile,
    id: '1addf30c-170e-414a-92bb-0975c8c3f242',

    text: 'It\'s hard to believe this movie did not get censorship approval. No where in the film do the characters '
    + 'mention what drug was involved or that drugs were even being used. Really the story teaches a morality '
    + 'lesson and that should be applauded.',
  },

  {
    author: 'MerryArtist',
    date: new Date('2008-07-27T00:00:00.000Z'),
    emotion: Emotions.sleeping,
    id: 'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',

    text: 'As a whole, this movie doesn\'t work at all. Different parts of the story jump around here and there '
    + 'and fail to form a cohesive piece -- the result of a poorly written script. For instance, halfway into '
    + 'the movie and you still get no idea of where it is all going. You get a vague sense that Johnny\'s '
    + '(Jimmy Stewart) inability to support his family and the consequent strain on his relationship with his '
    + 'wife is part of the main plot, only to be completely thrown off by a new development in the story, which '
    + 'doesn\'t fit into the first portion of the film at all. It\'s almost like watching two different stories '
    + 'at the same time.',
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

  {
    author: 'gigan-92',
    date: new Date('2012-02-01T00:00:00.000Z'),
    emotion: Emotions.smile,
    id: '3344169b-949d-4788-af30-d3671bf5fb3d',

    text: 'This film is a monumental piece of film history. I can honestly it might just be one of the best movies of all time. '
    + 'If anything, you have to acknowledge the writing. Almost every single line of dialogue in the film is a household '
    + 'terminology to this day, most people paying tribute to the film without even knowing it. That\'s why I wanted to use '
    + 'a less popular quote for the title, and it has its own meanings within the film. Another joy of the film is composer '
    + 'Max Steiner; yes, Max Steiner of 1933\'s "King Kong". His music is timeless, and he captures the mystery and romance '
    + 'of the film perfectly.',
  },
];

export default comments;
