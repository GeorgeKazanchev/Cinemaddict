const films = [
  {
    'id': '841c7b78-f1f0-4635-9b67-82b9fcfb2675',
    'comments': [
      '50a689fb-90e9-48f8-937e-8028029b8fe8',
      '1addf30c-170e-414a-92bb-0975c8c3f242',
    ],
    'film_info': {
      'title': 'The Man with the Golden Arm',
      'alternative_title': 'The Man with the Golden Arm',
      'total_rating': 9.0,
      'poster': './img/debug-posters/the-man-with-the-golden-arm.jpg',
      'age_rating': 6,
      'director': 'Otto Preminger',
      'writers': [
        'Walter Newman',
        'Lewis Meltzer',
        'Ben Hecht',
      ],
      'actors': [
        'Frank Sinatra',
        'Eleanor Parker',
        'Kim Novak',
      ],
      'release': {
        'date': '1955-12-15T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 119,
      'genre': [
        'Drama',
      ],
      'description': 'A junkie must face his true self to kick his drug addiction.',
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2023-07-03',
      'favorite': true,
    },
  },

  {
    'id': '65443dba-ae1d-4cbf-9f26-c6fcacd3c538',
    'comments': [],
    'film_info': {
      'title': 'The Great Flamarion',
      'alternative_title': 'The Great Flamarion',
      'total_rating': 8.9,
      'poster': './img/debug-posters/the-great-flamarion.jpg',
      'age_rating': 6,
      'director': 'Anthony Mann',
      'writers': [
        'Heinz Herald',
        'Richard Weil',
        'Anne Wigton',
      ],
      'actors': [
        'Erich von Stroheim',
        'Mary Beth Hughes',
      ],
      'release': {
        'date': '1945-03-30T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 78,
      'genre': [
        'Mystery',
      ],
      'description': 'Part of an entertainment act, a beautiful but unscrupulous female performer manipulates all the men in her life in order to achieve her aims.',
    },
    'user_details': {
      'watchlist': true,
      'already_watched': false,
      'watching_date': null,
      'favorite': true,
    },
  },

  {
    'id': 'f3fb372a-e03e-4414-b9fb-66cafc0e0f368',
    'comments': [
      'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',
    ],
    'film_info': {
      'title': 'Made for Each Other',
      'alternative_title': 'Made for Each Other',
      'total_rating': 5.8,
      'poster': './img/debug-posters/made-for-each-other.jpg',
      'age_rating': 6,
      'director': 'John Cromwell',
      'writers': [
        'Jo Swerling',
        'Frank Ryan',
      ],
      'actors': [
        'Carole Lombard',
        'James Stewart',
      ],
      'release': {
        'date': '1939-02-10T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 92,
      'genre': [
        'Comedy',
      ],
      'description': 'While on a business trip, an ambitious young lawyer meets and immediately falls in love with a stranger. They wed the following day, and tragedy soon strikes.',
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2024-05-25',
      'favorite': true,
    },
  },

  {
    'id': '50ad3cb1-9dd5-433b-badf-09b209453875',
    'comments': [],
    'film_info': {
      'title': 'Popeye the Sailor Meets Sindbad the Sailor',
      'alternative_title': 'Popeye the Sailor Meets Sindbad the Sailor',
      'total_rating': 6.3,
      'poster': './img/debug-posters/popeye-meets-sinbad.jpg',
      'age_rating': 6,
      'director': 'Dave Fleischer',
      'writers': [
        'Joe Stultz',
        'Bill Turner',
        'Jack Ward',
      ],
      'actors': [
        'Jack Mercer',
        'Mae Questel',
        'Gus Wickie',
      ],
      'release': {
        'date': '1936-11-27T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 16,
      'genre': [
        'Cartoon',
      ],
      'description': 'The legendary sailors Popeye and Sindbad do battle to see which one is the greatest.',
    },
    'user_details': {
      'watchlist': false,
      'already_watched': true,
      'watching_date': '2020-01-01',
      'favorite': true,
    },
  },

  {
    'id': 'f5d92da9-2ad5-4c25-9c11-bd3987aca857',
    'comments': [],
    'film_info': {
      'title': 'Sagebrush Trail',
      'alternative_title': 'Sagebrush Trail',
      'total_rating': 5.4,
      'poster': './img/debug-posters/sagebrush-trail.jpg',
      'age_rating': 6,
      'director': 'Armand Schaefer',
      'writers': [
        'Lindsley Parsons',
        'Will Beale',
      ],
      'actors': [
        'John Wayne',
        'Nancy Shubert',
        'Lane Chandler',
      ],
      'release': {
        'date': '1933-12-15T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 54,
      'genre': [
        'Western',
      ],
      'description': 'A man framed for murder escapes prison and goes west, where he joins a gang with the real killer involved.',
    },
    'user_details': {
      'watchlist': false,
      'already_watched': false,
      'watching_date': null,
      'favorite': false,
    },
  },

  {
    'id': 'e06c4c5a-c288-48f9-a38a-5d1d2b38e9f2',
    'comments': [
      '89a52349-de50-469f-a4b6-ecc19a7fd97a',
    ],
    'film_info': {
      'title': 'Santa Claus Conquers the Martians',
      'alternative_title': 'Santa Claus Conquers the Martians',
      'total_rating': 2.7,
      'poster': './img/debug-posters/santa-claus-conquers-the-martians.jpg',
      'age_rating': 12,
      'director': 'Nicholas Webster',
      'writers': [
        'Paul L. Jacobson',
      ],
      'actors': [
        'John Call',
        'Leonard Hicks',
        'Vincent Beck',
      ],
      'release': {
        'date': '1964-11-14T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 81,
      'genre': [
        'Comedy',
      ],
      'description': 'The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.',
    },
    'user_details': {
      'watchlist': true,
      'already_watched': false,
      'watching_date': null,
      'favorite': false,
    },
  },

  {
    'id': 'af130c4c-e5f5-4710-a913-eb2bebe2159c',
    'comments': [],
    'film_info': {
      'title': 'The Dance of Life',
      'alternative_title': 'The Dance of Life',
      'total_rating': 6.8,
      'poster': './img/debug-posters/the-dance-of-life.jpg',
      'age_rating': 12,
      'director': 'John Cromwell',
      'writers': [
        'Benjamin Glazer',
        'Julian Johnson',
      ],
      'actors': [
        'Hal Skelly',
        'Nancy Carroll',
      ],
      'release': {
        'date': '1929-08-16T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 115,
      'genre': [
        'Musical',
      ],
      'description': 'When a vaudeville comic and a pretty young dancer have little luck in their separate careers, they decide to combine their acts; to save money on the road, they get married.',
    },
    'user_details': {
      'watchlist': true,
      'already_watched': false,
      'watching_date': null,
      'favorite': true,
    },
  },

  {
    'id': '9a5ed0d7-a44d-44e9-8b87-81655e666f4b',
    'comments': [
      '3344169b-949d-4788-af30-d3671bf5fb3d',
    ],
    'film_info': {
      'title': 'Casablanca',
      'alternative_title': 'Casablanca',
      'total_rating': 8.5,
      'poster': './img/debug-posters/casablanca.jpg',
      'age_rating': 12,
      'director': 'Michael Curtiz',
      'writers': [
        'Julius J. Epstein',
        'Philip G. Epstein',
        'Howard Koch',
      ],
      'actors': [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Paul Henreid',
        'Claude Rains',
      ],
      'release': {
        'date': '1942-11-26T00:00:00.000Z',
        'release_country': 'United States',
      },
      'runtime': 102,
      'genre': [
        'Drama',
        'Romance',
      ],
      'description': 'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
    },
    'user_details': {
      'watchlist': true,
      'already_watched': true,
      'watching_date': '2024-06-16',
      'favorite': true,
    },
  },

  // {
  //   commentsIds: [],
  //   id: '6cec0f8a-390d-47bc-9e59-7c22986189d2',
  //   info: {
  //     actors: [
  //       'James Stewart',
  //       'Kim Novak',
  //       'Barbara Bel Geddes',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Vertigo',
  //     description: 'A former San Francisco police detective juggles wrestling with his personal demons and becoming obsessed with the hauntingly beautiful woman he has been hired to trail, who may be deeply disturbed.',
  //     director: 'Alfred Hitchcock',
  //     durationMinutes: 128,
  //     genres: [
  //       'Detective',
  //     ],
  //     posterSrc: './img/debug-posters/vertigo.jpg',
  //     rating: 8.3,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1958-04-09T00:00:00.000Z'),
  //     },
  //     title: 'Vertigo',
  //     writers: [
  //       'Alec Coppel',
  //       'Samuel A. Taylor',
  //       'Pierre Boileau',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2023-01-01'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '3aa39a59-50f1-4edd-b68e-d55f1c106a24',
  //   info: {
  //     actors: [
  //       'Jack Nicholson',
  //       'Faye Dunaway',
  //       'John Huston',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'Chinatown',
  //     description: 'A private detective hired to expose an adulterer in 1930s Los Angeles finds himself caught up in a web of deceit, corruption, and murder.',
  //     director: 'Roman Polanski',
  //     durationMinutes: 131,
  //     genres: [
  //       'Detective',
  //       'Noir',
  //     ],
  //     posterSrc: './img/debug-posters/chinatown.jpg',
  //     rating: 8.1,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1974-05-20T00:00:00.000Z'),
  //     },
  //     title: 'Chinatown',
  //     writers: [
  //       'Robert Towne',
  //       'Roman Polanski',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2022-05-23'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '683b1320-ec35-4f6c-ac7d-9bc1bf052fa7',
  //   info: {
  //     actors: [
  //       'James Stewart',
  //       'Grace Kelly',
  //       'Wendell Corey',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Rear Window',
  //     description: 'A bored photographer recovering from a broken leg passes the time by watching his neighbors and begins to suspect one of them of murder.',
  //     director: 'Alfred Hitchcock',
  //     durationMinutes: 112,
  //     genres: [
  //       'Detective',
  //       'Thriller',
  //     ],
  //     posterSrc: './img/debug-posters/rear-window.jpg',
  //     rating: 8.5,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1954-08-01T00:00:00.000Z'),
  //     },
  //     title: 'Rear Window',
  //     writers: [
  //       'John Michael Hayes',
  //       'Cornell Woolrich',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '002dee29-9ae8-4644-9cf1-e28892a402b9',
  //   info: {
  //     actors: [
  //       'Gene Tierney',
  //       'Dana Andrews',
  //       'Clifton Webb',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: 'Laura',
  //     description: 'A police detective falls in love with the woman whose murder he is investigating.',
  //     director: 'Otto Preminger',
  //     durationMinutes: 88,
  //     genres: [
  //       'Detective',
  //       'Noir',
  //     ],
  //     posterSrc: './img/debug-posters/laura.jpg',
  //     rating: 7.9,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1944-09-11T00:00:00.000Z'),
  //     },
  //     title: 'Laura',
  //     writers: [
  //       'Vera Caspary',
  //       'Jay Dratler',
  //       'Samuel Hoffenstein',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'e98160f4-a3b9-4ecb-83da-ed1ca7a4ab7c',
  //   info: {
  //     actors: [
  //       'Humphrey Bogart',
  //       'Mary Astor',
  //       'Gladys George',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'The Maltese Falcon',
  //     description: 'San Francisco private detective Sam Spade takes on a case that involves him with three eccentric criminals, a gorgeous liar and their quest for a priceless statuette, with the stakes rising after his partner is murdered.',
  //     director: 'John Huston',
  //     durationMinutes: 101,
  //     genres: [
  //       'Detective',
  //       'Noir',
  //     ],
  //     posterSrc: './img/debug-posters/maltese-falcon.jpg',
  //     rating: 7.9,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1941-09-18T00:00:00.000Z'),
  //     },
  //     title: 'The Maltese Falcon',
  //     writers: [
  //       'John Huston',
  //       'Dashiell Hammett',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: true,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '4b6a1bdf-12ea-401d-8c0a-e095e3541331',
  //   info: {
  //     actors: [
  //       'Cary Grant',
  //       'Eva Marie Saint',
  //       'James Mason',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'North by Northwest',
  //     description: 'A New York City advertising executive goes on the run after being mistaken for a government agent by a group of foreign spies, and falls for a woman whose loyalties he begins to doubt.',
  //     director: 'Alfred Hitchcock',
  //     durationMinutes: 136,
  //     genres: [
  //       'Detective',
  //       'Action',
  //     ],
  //     posterSrc: './img/debug-posters/north-by-northwest.jpg',
  //     rating: 8.3,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1959-06-01T00:00:00.000Z'),
  //     },
  //     title: 'North by Northwest',
  //     writers: [
  //       'Ernest Lehman',
  //       'Gerald Devriès',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2025-01-28'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '97d2c95d-34da-404e-bd77-c477aecfc41a',
  //   info: {
  //     actors: [
  //       'Isabella Rossellini',
  //       'Kyle MacLachlan',
  //       'Dennis Hopper',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'Blue Velvet',
  //     description: 'The discovery of a severed human ear found in a field leads a young man on an investigation related to a beautiful, mysterious nightclub singer and a group of psychopathic criminals who have kidnapped her child.',
  //     director: 'David Lynch',
  //     durationMinutes: 120,
  //     genres: [
  //       'Detective',
  //       'Noir',
  //     ],
  //     posterSrc: './img/debug-posters/blue-velvet.jpg',
  //     rating: 7.7,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1986-08-19T00:00:00.000Z'),
  //     },
  //     title: 'Blue Velvet',
  //     writers: [
  //       'David Lynch',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2022-10-12'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '94b8b0fd-6547-40e0-bbf4-33509ed45246',
  //   info: {
  //     actors: [
  //       'Ray Milland',
  //       'Grace Kelly',
  //       'Robert Cummings',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Dial M for Murder',
  //     description: 'A former tennis star arranges the murder of his adulterous wife.',
  //     director: 'Alfred Hitchcock',
  //     durationMinutes: 105,
  //     genres: [
  //       'Detective',
  //       'Thriller',
  //     ],
  //     posterSrc: './img/debug-posters/dial-m-for-murder.jpg',
  //     rating: 8.2,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1954-04-29T00:00:00.000Z'),
  //     },
  //     title: 'Dial M for Murder',
  //     writers: [
  //       'Frederick Knott',
  //       'Charles Dorat',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: true,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '4e396144-7810-4d91-8a7f-5fbb97cd35a2',
  //   info: {
  //     actors: [
  //       'Kevin Spacey',
  //       'Gabriel Byrne',
  //       'Chazz Palminteri',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'The Usual Suspects',
  //     description: 'The sole survivor of a pier shoot-out tells the story of how a notorious criminal influenced the events that began with five criminals meeting in a seemingly random police lineup.',
  //     director: 'Bryan Singer',
  //     durationMinutes: 106,
  //     genres: [
  //       'Detective',
  //       'Crime',
  //     ],
  //     posterSrc: './img/debug-posters/usual-suspects.jpg',
  //     rating: 8.5,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1995-07-16T00:00:00.000Z'),
  //     },
  //     title: 'The Usual Suspects',
  //     writers: [
  //       'Christopher McQuarrie',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '27296bc4-280e-4626-954f-b807a11e8693',
  //   info: {
  //     actors: [
  //       'Orson Welles',
  //       'Joseph Cotten',
  //       'Alida Valli',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'The Third Man',
  //     description: 'Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.',
  //     director: 'Carol Reed',
  //     durationMinutes: 104,
  //     genres: [
  //       'Detective',
  //       'Noir',
  //     ],
  //     posterSrc: './img/debug-posters/third-man.jpg',
  //     rating: 8.1,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1950-01-02T00:00:00.000Z'),
  //     },
  //     title: 'The Third Man',
  //     writers: [
  //       'Graham Greene',
  //       'Orson Welles',
  //       'Alexander Korda',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '0a940085-1cb5-48a8-96d5-e1dd62eebe62',
  //   info: {
  //     actors: [
  //       'Keir Dullea',
  //       'Gary Lockwood',
  //       'William Sylvester',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: '2001: A Space Odyssey',
  //     description: 'When a mysterious artifact is uncovered on the Moon, a spacecraft manned by two humans and one supercomputer is sent to Jupiter to find its origins.',
  //     director: 'Stanley Kubrick',
  //     durationMinutes: 139,
  //     genres: [
  //       'Sci-Fi',
  //     ],
  //     posterSrc: './img/debug-posters/2001-space-odyssey.jpg',
  //     rating: 8.3,
  //     release: {
  //       country: 'United Kingdom',
  //       date: new Date('1968-04-01T00:00:00.000Z'),
  //     },
  //     title: '2001: A Space Odyssey',
  //     writers: [
  //       'Stanley Kubrick',
  //       'Arthur C. Clarke',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '0e6a030d-1314-4c73-8d08-f4ac96321422',
  //   info: {
  //     actors: [
  //       'Mark Hamill',
  //       'Harrison Ford',
  //       'Carrie Fisher',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Star Wars: Episode IV - A New Hope',
  //     description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
  //     director: 'George Lucas',
  //     durationMinutes: 121,
  //     genres: [
  //       'Sci-Fi',
  //       'Action',
  //     ],
  //     posterSrc: './img/debug-posters/star-wars-iv.jpg',
  //     rating: 8.6,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1977-04-25T00:00:00.000Z'),
  //     },
  //     title: 'Star Wars: Episode IV - A New Hope',
  //     writers: [
  //       'George Lucas',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: false,
  //     isWatched: true,
  //     watchingDate: new Date('2019-03-18'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'f50ad014-04d3-4abc-bfe2-9fd857c88f0f',
  //   info: {
  //     actors: [
  //       'Henry Thomas',
  //       'Drew Barrymore',
  //       'Peter Coyote',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'E.T. the Extra-Terrestrial',
  //     description: 'A troubled child summons the courage to help a friendly alien escape from Earth and return to his home planet.',
  //     director: 'Steven Spielberg',
  //     durationMinutes: 114,
  //     genres: [
  //       'Sci-Fi',
  //       'Family',
  //     ],
  //     posterSrc: './img/debug-posters/et.jpg',
  //     rating: 7.9,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1982-05-11T00:00:00.000Z'),
  //     },
  //     title: 'E.T. the Extra-Terrestrial',
  //     writers: [
  //       'Melissa Mathison',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'b58144b3-83fd-475c-bdd4-66536369003f',
  //   info: {
  //     actors: [
  //       'Malcolm McDowell',
  //       'Patrick Magee',
  //       'Michael Bates',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'A Clockwork Orange',
  //     description: 'Alex DeLarge and his droogs barbarize a decaying near-future.',
  //     director: 'Stanley Kubrick',
  //     durationMinutes: 136,
  //     genres: [
  //       'Sci-Fi',
  //       'Crime',
  //     ],
  //     posterSrc: './img/debug-posters/clockwork-orange.jpg',
  //     rating: 8.2,
  //     release: {
  //       country: 'United Kingdom',
  //       date: new Date('1972-00-13T00:00:00.000Z'),
  //     },
  //     title: 'A Clockwork Orange',
  //     writers: [
  //       'Stanley Kubrick',
  //       'Anthony Burgess',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2018-05-14'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '3c9657c0-1235-48c3-a6eb-d30e6b6f264a',
  //   info: {
  //     actors: [
  //       'Michael Rennie',
  //       'Patricia Neal',
  //       'Hugh Marlowe',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: 'The Day the Earth Stood Still',
  //     description: 'An alien lands in Washington, D.C. and tells the people of Earth that they must live peacefully or be destroyed as a danger to other planets.',
  //     director: 'Robert Wise',
  //     durationMinutes: 92,
  //     genres: [
  //       'Sci-Fi',
  //       'Drama',
  //     ],
  //     posterSrc: './img/debug-posters/day-the-earth-stood-still.jpg',
  //     rating: 7.7,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1951-08-18T00:00:00.000Z'),
  //     },
  //     title: 'The Day the Earth Stood Still',
  //     writers: [
  //       'Edmund H. North',
  //       'Harry Bates',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '8adcf561-8a36-43ed-a70d-cd44602b741b',
  //   info: {
  //     actors: [
  //       'Harrison Ford',
  //       'Rutger Hauer',
  //       'Sean Young',
  //     ],
  //     ageRating: 16,
  //     alternativeTitle: 'Blade Runner',
  //     description: 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
  //     director: 'Ridley Scott',
  //     durationMinutes: 117,
  //     genres: [
  //       'Sci-Fi',
  //       'Cyberpunk',
  //     ],
  //     posterSrc: './img/debug-posters/blade-runner.jpg',
  //     rating: 8.1,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1982-05-25T00:00:00.000Z'),
  //     },
  //     title: 'Blade Runner',
  //     writers: [
  //       'Hampton Fancher',
  //       'David Webb Peoples',
  //       'Philip K. Dick',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2024-09-16'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '78c58752-fc80-48e2-8bab-97ff876f5110',
  //   info: {
  //     actors: [
  //       'Sigourney Weaver',
  //       'Tom Skerritt',
  //       'John Hurt',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'Alien',
  //     description: 'After investigating a mysterious transmission of unknown origin, the crew of a commercial spacecraft encounters a deadly lifeform.',
  //     director: 'Ridley Scott',
  //     durationMinutes: 116,
  //     genres: [
  //       'Sci-Fi',
  //       'Horror',
  //     ],
  //     posterSrc: './img/debug-posters/alien.jpg',
  //     rating: 8.5,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1979-04-25T00:00:00.000Z'),
  //     },
  //     title: 'Alien',
  //     writers: [
  //       'Dan O\'Bannon',
  //       'Ronald Shusett',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2015-05-03'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'cd1abd77-54e2-4634-a504-7945d1c109be',
  //   info: {
  //     actors: [
  //       'Arnold Schwarzenegger',
  //       'Linda Hamilton',
  //       'Edward Furlong',
  //     ],
  //     ageRating: 16,
  //     alternativeTitle: 'Terminator 2: Judgment Day',
  //     description: 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son John from an even more advanced and powerful cyborg.',
  //     director: 'James Cameron',
  //     durationMinutes: 137,
  //     genres: [
  //       'Sci-Fi',
  //     ],
  //     posterSrc: './img/debug-posters/terminator-2.jpg',
  //     rating: 8.6,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1991-06-03T00:00:00.000Z'),
  //     },
  //     title: 'Terminator 2: Judgment Day',
  //     writers: [
  //       'James Cameron',
  //       'William Wisher',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2006-04-12'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '863bf06b-48a4-42a5-9396-ccbff7f983b1',
  //   info: {
  //     actors: [
  //       'Donald Sutherland',
  //       'Brooke Adams',
  //       'Jeff Goldblum',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Invasion of the Body Snatchers',
  //     description: 'When strange seeds drift to earth from space, mysterious pods begin to grow and invade San Francisco, replicating the city\'s residents one body at a time.',
  //     director: 'Philip Kaufman',
  //     durationMinutes: 80,
  //     genres: [
  //       'Sci-Fi',
  //       'Horror',
  //     ],
  //     posterSrc: './img/debug-posters/invasion-of-the-body-snatchers.jpg',
  //     rating: 7.4,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1956-01-05T00:00:00.000Z'),
  //     },
  //     title: 'Invasion of the Body Snatchers',
  //     writers: [
  //       'W.D. Richter',
  //       'Jack Finney',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'e30cd21b-7f42-4dd7-808f-51e339e2b5c0',
  //   info: {
  //     actors: [
  //       'Michael J. Fox',
  //       'Christopher Lloyd',
  //       'Lea Thompson',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: 'Back to the Future',
  //     description: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
  //     director: 'Robert Zemeckis',
  //     durationMinutes: 116,
  //     genres: [
  //       'Sci-Fi',
  //       'Comedy',
  //     ],
  //     posterSrc: './img/debug-posters/back-to-the-future.jpg',
  //     rating: 8.5,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1985-06-03T00:00:00.000Z'),
  //     },
  //     title: 'Back to the Future',
  //     writers: [
  //       'Robert Zemeckis',
  //       'Bob Gale',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2017-01-02'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'c57f655d-0bea-43c2-b925-9e1277f74442',
  //   info: {
  //     actors: [
  //       'John Wayne',
  //       'Jeffrey Hunter',
  //       'Vera Miles',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: 'The Searchers',
  //     description: 'An American Civil War veteran embarks on a years-long journey to rescue his niece from the Comanches after the rest of his brother\'s family is massacred in a raid on their Texas farm.',
  //     director: 'John Ford',
  //     durationMinutes: 119,
  //     genres: [
  //       'Western',
  //     ],
  //     posterSrc: './img/debug-posters/searchers.jpg',
  //     rating: 7.8,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1956-04-16T00:00:00.000Z'),
  //     },
  //     title: 'The Searchers',
  //     writers: [
  //       'Frank S. Nugent',
  //       'Alan Le May',
  //       'Charles Dorat',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2024-07-10'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '1fc1f6d9-e5c3-47a9-8960-87d4dda12e22',
  //   info: {
  //     actors: [
  //       'Gary Cooper',
  //       'Grace Kelly',
  //       'Katy Jurado',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'High Noon',
  //     description: 'A town Marshal, despite the disagreements of his newlywed bride and the townspeople around him, must face a gang of deadly killers alone at "high noon" when the gang leader, an outlaw he "sent up" years ago, arrives on the noon train.',
  //     director: 'Fred Zinnemann',
  //     durationMinutes: 85,
  //     genres: [
  //       'Western',
  //       'Drama',
  //       'Thriller',
  //     ],
  //     posterSrc: './img/debug-posters/high-noon.jpg',
  //     rating: 7.9,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1952-06-24T00:00:00.000Z'),
  //     },
  //     title: 'High Noon',
  //     writers: [
  //       'Carl Foreman',
  //       'John W. Cunningham',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2025-01-27'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'de9c2d3c-5b56-4a87-bbe0-58b31f1a3fb8',
  //   info: {
  //     actors: [
  //       'Alan Ladd',
  //       'Jean Arthur',
  //       'Van Heflin',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: 'Shane',
  //     description: 'An ex-gunfighter defends homesteaders in 1889 Wyoming.',
  //     director: 'George Stevens',
  //     durationMinutes: 118,
  //     genres: [
  //       'Western',
  //       'Drama',
  //     ],
  //     posterSrc: './img/debug-posters/shane.jpg',
  //     rating: 7.6,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1953-03-23T00:00:00.000Z'),
  //     },
  //     title: 'Shane',
  //     writers: [
  //       'A.B. Guthrie Jr.',
  //       'Jack Sher',
  //       'Jack Schaefer',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'c0595856-ea2f-4a85-8fb5-969cee353352',
  //   info: {
  //     actors: [
  //       'Clint Eastwood',
  //       'Gene Hackman',
  //       'Morgan Freeman',
  //     ],
  //     ageRating: 16,
  //     alternativeTitle: 'Unforgiven',
  //     description: 'Retired Old West gunslinger Will Munny reluctantly takes on one last job to avenge an injustice with the help of his old partner and a newer outlaw known simply as The Schofield Kid.',
  //     director: 'Clint Eastwood',
  //     durationMinutes: 131,
  //     genres: [
  //       'Western',
  //     ],
  //     posterSrc: './img/debug-posters/unforgiven.jpg',
  //     rating: 8.2,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1992-07-07T00:00:00.000Z'),
  //     },
  //     title: 'Unforgiven',
  //     writers: [
  //       'David Webb Peoples',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2024-05-11'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '1539da2c-ecc7-461f-b09b-59fb3d23a330',
  //   info: {
  //     actors: [
  //       'William Holden',
  //       'Ernest Borgnine',
  //       'Robert Ryan',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'The Wild Bunch',
  //     description: 'An aging group of outlaws in 1913 Texas look for one last big score, selling stolen Army rifles to a rogue Mexican general during that country\'s revolution, as the traditional American West is disappearing around them.',
  //     director: 'Sam Peckinpah',
  //     durationMinutes: 145,
  //     genres: [
  //       'Western',
  //       'Action',
  //     ],
  //     posterSrc: './img/debug-posters/wild-bunchn.jpg',
  //     rating: 7.9,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1969-05-18T00:00:00.000Z'),
  //     },
  //     title: 'The Wild Bunch',
  //     writers: [
  //       'Walon Greens',
  //       'Sam Peckinpah',
  //       'Roy N. Sickner',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: true,
  //     isWatched: true,
  //     watchingDate: new Date('2023-10-16'),
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '37d6911e-dcea-4fa1-86bc-cec0bdd9366e',
  //   info: {
  //     actors: [
  //       'John Wayne',
  //       'Montgomery Clift',
  //       'Joanne Dru',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Red River',
  //     description: 'Dunson leads a cattle drive, the culmination of over 14 years of work, to its destination in Missouri. But his tyrannical behavior along the way causes a mutiny, led by his adopted son.',
  //     director: 'Howard Hawks',
  //     durationMinutes: 127,
  //     genres: [
  //       'Western',
  //       'Drama',
  //     ],
  //     posterSrc: './img/debug-posters/red-river.jpg',
  //     rating: 7.7,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1948-07-26T00:00:00.000Z'),
  //     },
  //     title: 'Red River',
  //     writers: [
  //       'Borden Chase',
  //       'Charles Schnee',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '6c7612c2-9e3a-4588-8616-d7d0588919f8',
  //   info: {
  //     actors: [
  //       'Paul Newman',
  //       'Robert Redford',
  //       'Katharine Ross',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Butch Cassidy and the Sundance Kid',
  //     description: 'In 1890s Wyoming, Butch Cassidy and The Sundance Kid lead a band of outlaws. When a train robbery goes wrong, they find themselves on the run with a posse hard on their heels..',
  //     director: 'George Roy Hill',
  //     durationMinutes: 110,
  //     genres: [
  //       'Western',
  //     ],
  //     posterSrc: './img/debug-posters/butch-cassidy-and-sundance-kid.jpg',
  //     rating: 8.0,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1969-08-24T00:00:00.000Z'),
  //     },
  //     title: 'Butch Cassidy and the Sundance Kid',
  //     writers: [
  //       'William Goldman',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: 'eb180290-bb6f-4478-8133-13c13d4fee30',
  //   info: {
  //     actors: [
  //       'Warren Beatty',
  //       'Julie Christie',
  //       'Rene Auberjonois',
  //     ],
  //     ageRating: 18,
  //     alternativeTitle: 'McCabe & Mrs. Miller',
  //     description: 'A gambler and a prostitute become business partners in a remote Old West mining town, and their enterprise thrives until a large corporation arrives on the scene.',
  //     director: 'Robert Altman',
  //     durationMinutes: 121,
  //     genres: [
  //       'Western',
  //     ],
  //     posterSrc: './img/debug-posters/mccabe-and-mrs-miller.jpg',
  //     rating: 7.6,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1971-05-24T00:00:00.000Z'),
  //     },
  //     title: 'McCabe & Mrs. Miller',
  //     writers: [
  //       'Edmund Naughton',
  //       'Robert Altman',
  //       'Brian McKay',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '03f47ea1-acc5-423d-8891-2fd810a6ffcc',
  //   info: {
  //     actors: [
  //       'John Wayne',
  //       'Claire Trevor',
  //       'Andy Devine',
  //     ],
  //     ageRating: 12,
  //     alternativeTitle: 'Stagecoach',
  //     description: 'A group of people traveling on a stagecoach find their journey complicated by the threat of Geronimo and learn something about each other in the process.',
  //     director: 'John Ford',
  //     durationMinutes: 96,
  //     genres: [
  //       'Western',
  //       'Adventure',
  //     ],
  //     posterSrc: './img/debug-posters/stagecoach.jpg',
  //     rating: 7.8,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1939-02-03T00:00:00.000Z'),
  //     },
  //     title: 'Stagecoach',
  //     writers: [
  //       'Ernest Haycox',
  //       'Dudley Nichols',
  //       'Ben Hecht',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: true,
  //     isFavorite: true,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },

  // {
  //   commentsIds: [],
  //   id: '5c6ad8da-0267-45ca-a9ec-37cfcdb9439d',
  //   info: {
  //     actors: [
  //       'Jane Fonda',
  //       'Lee Marvin',
  //       'Michael Callan',
  //     ],
  //     ageRating: 6,
  //     alternativeTitle: 'Cat Ballou',
  //     description: 'A young schoolteacher turns into an outlaw to avenge her murdered father.',
  //     director: 'Elliot Silverstein',
  //     durationMinutes: 96,
  //     genres: [
  //       'Western',
  //     ],
  //     posterSrc: './img/debug-posters/cat-ballou.jpg',
  //     rating: 6.7,
  //     release: {
  //       country: 'United States',
  //       date: new Date('1965-05-18T00:00:00.000Z'),
  //     },
  //     title: 'Cat Ballou',
  //     writers: [
  //       'Walter Newman',
  //       'Frank Pierson',
  //       'Roy Chanslor',
  //     ],
  //   },
  //   userDetails: {
  //     inWatchlist: false,
  //     isFavorite: false,
  //     isWatched: false,
  //     watchingDate: null,
  //   },
  // },
];

module.exports = {
  films,
};
