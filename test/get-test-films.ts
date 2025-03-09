import { Film } from '../src/ts/model';
import type FilmDto from '../src/ts/api/types/film-dto';

export const getTestFilms = (): Film[] => (
  [
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
      commentsIds: [
        'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',
      ],
      id: 'f3fb372a-e03e-4414-b9fb-66cafc0e0f36',
      info: {
        actors: [
          'Carole Lombard',
          'James Stewart',
        ],
        ageRating: 6,
        alternativeTitle: 'Made for Each Other',
        description: `While on a business trip, an ambitious young lawyer meets and immediately falls in love with a stranger. They wed the following day, and tragedy soon strikes.`,
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
        isFavorite: false,
        isWatched: true,
        watchingDate: new Date('2024-05-25'),
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
        description: `A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.`,
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
        watchingDate: new Date('2024-07-15'),
      },
    },
  ]
);

export const getEmptyFilm = (): Film => (
  {
    commentsIds: [],
    id: '',
    info: {
      actors: [],
      ageRating: 0,
      alternativeTitle: 'Empty film',
      description: '',
      director: '',
      durationMinutes: 0,
      genres: [],
      posterSrc: '',
      rating: 0.0,
      release: {
        country: '',
        date: new Date('1939-02-10T00:00:00.000Z'),
      },
      title: 'Empty film',
      writers: [],
    },
    userDetails: {
      inWatchlist: false,
      isFavorite: false,
      isWatched: false,
      watchingDate: null,
    },
  }
);

export const getDtoTestFilms = (): FilmDto[] => (
  [
    {
      id: '841c7b78-f1f0-4635-9b67-82b9fcfb2675',
      comments: [
        '50a689fb-90e9-48f8-937e-8028029b8fe8',
        '1addf30c-170e-414a-92bb-0975c8c3f242',
      ],
      film_info: {
        title: 'The Man with the Golden Arm',
        alternative_title: 'The Man with the Golden Arm',
        total_rating: 9.0,
        poster: './img/debug-posters/the-man-with-the-golden-arm.jpg',
        age_rating: 6,
        director: 'Otto Preminger',
        writers: [
          'Walter Newman',
          'Lewis Meltzer',
          'Ben Hecht',
        ],
        actors: [
          'Frank Sinatra',
          'Eleanor Parker',
          'Kim Novak',
        ],
        release: {
          date: '1955-12-15',
          release_country: 'United States',
        },
        runtime: 119,
        genre: [
          'Drama',
        ],
        description: 'A junkie must face his true self to kick his drug addiction.',
      },
      user_details: {
        watchlist: false,
        already_watched: true,
        watching_date: '2023-07-03T00:00:00.000Z',
        favorite: true,
      },
    },

    {
      id: 'f3fb372a-e03e-4414-b9fb-66cafc0e0f36',
      comments: [
        'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',
      ],
      film_info: {
        title: 'Made for Each Other',
        alternative_title: 'Made for Each Other',
        total_rating: 5.8,
        poster: './img/debug-posters/made-for-each-other.jpg',
        age_rating: 6,
        director: 'John Cromwell',
        writers: [
          'Jo Swerling',
          'Frank Ryan',
        ],
        actors: [
          'Carole Lombard',
          'James Stewart',
        ],
        release: {
          date: '1939-02-10',
          release_country: 'United States',
        },
        runtime: 92,
        genre: [
          'Comedy',
        ],
        description: 'While on a business trip, an ambitious young lawyer meets and immediately falls in love with a stranger. They wed the following day, and tragedy soon strikes.',
      },
      user_details: {
        watchlist: false,
        already_watched: true,
        watching_date: '2024-05-25T00:00:00.000Z',
        favorite: false,
      },
    },
  ]
);
