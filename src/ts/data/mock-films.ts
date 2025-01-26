import type Film from '../model/types/film';

const films: Film[] = [
  {
    commentsIds: [
      '50a689fb-90e9-48f8-937e-8028029b8fe8',
      '1addf30c-170e-414a-92bb-0975c8c3f242',
    ],
    id: '841c7b78-f1f0-4635-9b67-82b9fcfb2675',
    info: {
      actors: [
        'Frank Sinatra',
        'Eleanor Parker',
        'Kim Novak',
      ],
      ageRating: 6,
      alternativeTitle: 'The Man with the Golden Arm',
      description: 'A junkie must face his true self to kick his drug addiction.',
      director: 'Otto Preminger',
      durationMinutes: 119,
      genres: [
        'Drama',
      ],
      posterSrc: './img/debug-posters/the-man-with-the-golden-arm.jpg',
      rating: 9.0,
      release: {
        country: 'United States',
        date: new Date('1955-12-15T00:00:00.000Z'),
      },
      title: 'The Man with the Golden Arm',
      writers: [
        'Walter Newman',
        'Lewis Meltzer',
        'Ben Hecht',
      ],
    },
    userDetails: {
      inWatchlist: false,
      isFavorite: true,
      isWatched: true,
      watchingDate: new Date('2023-07-03'),
    },
  },

  {
    commentsIds: [],
    id: '65443dba-ae1d-4cbf-9f26-c6fcacd3c538',
    info: {
      actors: [
        'Erich von Stroheim',
        'Mary Beth Hughes',
      ],
      ageRating: 6,
      alternativeTitle: 'The Great Flamarion',
      description: 'Part of an entertainment act, a beautiful but unscrupulous female performer manipulates all the men in her life in order to achieve her aims.',
      director: 'Anthony Mann',
      durationMinutes: 78,
      genres: [
        'Mystery',
      ],
      posterSrc: './img/debug-posters/the-great-flamarion.jpg',
      rating: 8.9,
      release: {
        country: 'United States',
        date: new Date('1945-03-30T00:00:00.000Z'),
      },
      title: 'The Great Flamarion',
      writers: [
        'Heinz Herald',
        'Richard Weil',
        'Anne Wigton',
      ],
    },
    userDetails: {
      inWatchlist: true,
      isFavorite: true,
      isWatched: false,
      watchingDate: null,
    },
  },

  {
    commentsIds: [
      'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',
    ],
    id: 'f3fb372a-e03e-4414-b9fb-66cafc0e0f368',
    info: {
      actors: [
        'Carole Lombard',
        'James Stewart',
      ],
      ageRating: 6,
      alternativeTitle: 'Made for Each Other',
      description: 'While on a business trip, an ambitious young lawyer meets and immediately falls in love with a stranger. They wed the following day, and tragedy soon strikes.',
      director: 'John Cromwell',
      durationMinutes: 92,
      genres: [
        'Comedy',
      ],
      posterSrc: './img/debug-posters/made-for-each-other.jpg',
      rating: 5.8,
      release: {
        country: 'United States',
        date: new Date('1939-02-10T00:00:00.000Z'),
      },
      title: 'Made for Each Other',
      writers: [
        'Jo Swerling',
        'Frank Ryan',
      ],
    },
    userDetails: {
      inWatchlist: false,
      isFavorite: true,
      isWatched: true,
      watchingDate: new Date('2024-05-25'),
    },
  },

  {
    commentsIds: [],
    id: '50ad3cb1-9dd5-433b-badf-09b209453875',
    info: {
      actors: [
        'Jack Mercer',
        'Mae Questel',
        'Gus Wickie',
      ],
      ageRating: 6,
      alternativeTitle: 'Popeye the Sailor Meets Sindbad the Sailor',
      description: 'The legendary sailors Popeye and Sindbad do battle to see which one is the greatest.',
      director: 'Dave Fleischer',
      durationMinutes: 16,
      genres: [
        'Cartoon',
      ],
      posterSrc: './img/debug-posters/popeye-meets-sinbad.jpg',
      rating: 6.3,
      release: {
        country: 'United States',
        date: new Date('1936-11-27T00:00:00.000Z'),
      },
      title: 'Popeye the Sailor Meets Sindbad the Sailor',
      writers: [
        'Joe Stultz',
        'Bill Turner',
        'Jack Ward',
      ],
    },
    userDetails: {
      inWatchlist: false,
      isFavorite: true,
      isWatched: true,
      watchingDate: new Date('2020-01-01'),
    },
  },

  {
    commentsIds: [],
    id: 'f5d92da9-2ad5-4c25-9c11-bd3987aca857',
    info: {
      actors: [
        'John Wayne',
        'Nancy Shubert',
        'Lane Chandler',
      ],
      ageRating: 6,
      alternativeTitle: 'Sagebrush Trail',
      description: 'A man framed for murder escapes prison and goes west, where he joins a gang with the real killer involved.',
      director: 'Armand Schaefer',
      durationMinutes: 54,
      genres: [
        'Western',
      ],
      posterSrc: './img/debug-posters/sagebrush-trail.jpg',
      rating: 5.4,
      release: {
        country: 'United States',
        date: new Date('1933-12-15T00:00:00.000Z'),
      },
      title: 'Sagebrush Trail',
      writers: [
        'Lindsley Parsons',
        'Will Beale',
      ],
    },
    userDetails: {
      inWatchlist: false,
      isFavorite: false,
      isWatched: false,
      watchingDate: null,
    },
  },

  {
    commentsIds: [
      '89a52349-de50-469f-a4b6-ecc19a7fd97a',
    ],
    id: 'e06c4c5a-c288-48f9-a38a-5d1d2b38e9f2',
    info: {
      actors: [
        'John Call',
        'Leonard Hicks',
        'Vincent Beck',
      ],
      ageRating: 12,
      alternativeTitle: 'Santa Claus Conquers the Martians',
      description: 'The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.',
      director: 'Nicholas Webster',
      durationMinutes: 81,
      genres: [
        'Comedy',
      ],
      posterSrc: './img/debug-posters/santa-claus-conquers-the-martians.jpg',
      rating: 2.7,
      release: {
        country: 'United States',
        date: new Date('1964-11-14T00:00:00.000Z'),
      },
      title: 'Santa Claus Conquers the Martians',
      writers: [
        'Paul L. Jacobson',
      ],
    },
    userDetails: {
      inWatchlist: true,
      isFavorite: false,
      isWatched: false,
      watchingDate: null,
    },
  },

  {
    commentsIds: [],
    id: 'af130c4c-e5f5-4710-a913-eb2bebe2159c',
    info: {
      actors: [
        'Hal Skelly',
        'Nancy Carroll',
      ],
      ageRating: 12,
      alternativeTitle: 'The Dance of Life',
      description: 'When a vaudeville comic and a pretty young dancer have little luck in their separate careers, they decide to combine their acts; to save money on the road, they get married.',
      director: 'John Cromwell',
      durationMinutes: 115,
      genres: [
        'Musical',
      ],
      posterSrc: './img/debug-posters/the-dance-of-life.jpg',
      rating: 6.8,
      release: {
        country: 'United States',
        date: new Date('1929-08-16T00:00:00.000Z'),
      },
      title: 'The Dance of Life',
      writers: [
        'Benjamin Glazer',
        'Julian Johnson',
      ],
    },
    userDetails: {
      inWatchlist: true,
      isFavorite: true,
      isWatched: false,
      watchingDate: null,
    },
  },

  {
    commentsIds: [
      '3344169b-949d-4788-af30-d3671bf5fb3d',
    ],
    id: '9a5ed0d7-a44d-44e9-8b87-81655e666f4b',
    info: {
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Paul Henreid',
        'Claude Rains',
      ],
      ageRating: 12,
      alternativeTitle: 'Casablanca',
      description: 'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
      director: 'Michael Curtiz',
      durationMinutes: 102,
      genres: [
        'Drama',
        'Romance',
      ],
      posterSrc: './img/debug-posters/casablanca.jpg',
      rating: 8.5,
      release: {
        country: 'United States',
        date: new Date('1942-11-26T00:00:00.000Z'),
      },
      title: 'Casablanca',
      writers: [
        'Julius J. Epstein',
        'Philip G. Epstein',
        'Howard Koch',
      ],
    },
    userDetails: {
      inWatchlist: true,
      isFavorite: true,
      isWatched: true,
      watchingDate: new Date('2024-06-16'),
    },
  },
];

export default films;
