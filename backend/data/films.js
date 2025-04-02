const films = [
  {
    id: 'c9d3a11c-a506-4ae6-b48b-920497168a23',
    comments: [],
    film_info: {
      title: 'Band of Outsiders',
      alternative_title: 'Bande à part',
      total_rating: 7.6,
      poster: '/img/band-of-outsiders.jpg',
      age_rating: 12,
      director: 'Jean-Luc Godard',
      writers: [
        'Dolores Hitchens',
        'Jean-Luc Godard',
      ],
      actors: [
        'Anna Karina',
        'Claude Brasseur',
        'Danièle Girard',
      ],
      release: {
        date: '1964-08-05T00:00:00.000Z',
        release_country: 'France',
      },
      runtime: 97,
      genre: [
        'Crime',
        'Drama',
      ],
      description: 'Two crooks with a fondness for old Hollywood B-movies convince a languages student to help them commit a robbery.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2023-08-15',
      favorite: true,
    },
  },

  {
    id: '732e9a63-b4cb-423e-8238-cfe53446cffd',
    comments: [],
    film_info: {
      title: 'Breathless',
      alternative_title: 'À bout de souffle',
      total_rating: 7.7,
      poster: '/img/breathless.jpg',
      age_rating: 12,
      director: 'Jean-Luc Godard',
      writers: [
        'Claude Chabrol',
        'Jean-Luc Godard',
        'François Truffaut',
      ],
      actors: [
        'Jean-Paul Belmondo',
        'Jean Seberg',
        'Van Doude',
      ],
      release: {
        date: '1960-03-16T00:00:00.000Z',
        release_country: 'France',
      },
      runtime: 90,
      genre: [
        'Crime',
      ],
      description: 'A small-time crook, hunted by the authorities for a car theft and the murder of a police officer, attempts to persuade a hip American journalism student to run away with him to Italy.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2023-08-16',
      favorite: true,
    },
  },

  {
    id: 'c1e755b6-1618-4b10-8114-ff1419b749c1',
    comments: [],
    film_info: {
      title: 'M',
      alternative_title: 'M - Eine Stadt sucht einen Mörder',
      total_rating: 8.3,
      poster: '/img/m.jpg',
      age_rating: 16,
      director: 'Fritz Lang',
      writers: [
        'Thea von Harbou',
        'Fritz Lang',
        'Egon Jacobsohn',
      ],
      actors: [
        'Peter Lorre',
        'Ellen Widmann',
        'Inge Landgut',
      ],
      release: {
        date: '1931-05-11T00:00:00.000Z',
        release_country: 'Germany',
      },
      runtime: 111,
      genre: [
        'Thriller',
        'Crime',
      ],
      description: 'When the police in a German city are unable to catch a child-murderer, other criminals join in the manhunt.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2025-01-29',
      favorite: true,
    },
  },

  {
    id: '3afaa263-1f76-4abf-ae89-4e47d5521fc9',
    comments: [],
    film_info: {
      title: 'Broken Blossoms',
      alternative_title: 'Broken Blossoms',
      total_rating: 7.2,
      poster: '/img/broken-blossoms.jpg',
      age_rating: 6,
      director: 'D.W. Griffith',
      writers: [
        'Thomas Burke',
        'D.W. Griffith',
      ],
      actors: [
        'Lillian Gish',
        'Richard Barthelmess',
        'Donald Crisp',
      ],
      release: {
        date: '1919-05-13T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 90,
      genre: [
        'Drama',
        'Romance',
      ],
      description: 'A frail waif, abused by her brutal boxer father in London\'s seedy Limehouse District, is befriended by a sensitive Chinese immigrant with tragic consequences.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2024-07-24',
      favorite: true,
    },
  },

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
      poster: '/img/the-man-with-the-golden-arm.jpg',
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
        date: '1955-12-15T00:00:00.000Z',
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
      watching_date: '2023-07-03',
      favorite: true,
    },
  },

  {
    id: '65443dba-ae1d-4cbf-9f26-c6fcacd3c538',
    comments: [],
    film_info: {
      title: 'The Great Flamarion',
      alternative_title: 'The Great Flamarion',
      total_rating: 8.9,
      poster: '/img/the-great-flamarion.jpg',
      age_rating: 6,
      director: 'Anthony Mann',
      writers: [
        'Heinz Herald',
        'Richard Weil',
        'Anne Wigton',
      ],
      actors: [
        'Erich von Stroheim',
        'Mary Beth Hughes',
      ],
      release: {
        date: '1945-03-30T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 78,
      genre: [
        'Mystery',
      ],
      description: 'Part of an entertainment act, a beautiful but unscrupulous female performer manipulates all the men in her life in order to achieve her aims.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: 'f3fb372a-e03e-4414-b9fb-66cafc0e0f368',
    comments: [
      'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',
    ],
    film_info: {
      title: 'Made for Each Other',
      alternative_title: 'Made for Each Other',
      total_rating: 5.8,
      poster: '/img/made-for-each-other.jpg',
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
        date: '1939-02-10T00:00:00.000Z',
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
      watching_date: '2024-05-25',
      favorite: true,
    },
  },

  {
    id: '50ad3cb1-9dd5-433b-badf-09b209453875',
    comments: [],
    film_info: {
      title: 'Popeye the Sailor Meets Sindbad the Sailor',
      alternative_title: 'Popeye the Sailor Meets Sindbad the Sailor',
      total_rating: 6.3,
      poster: '/img/popeye-meets-sinbad.jpg',
      age_rating: 6,
      director: 'Dave Fleischer',
      writers: [
        'Joe Stultz',
        'Bill Turner',
        'Jack Ward',
      ],
      actors: [
        'Jack Mercer',
        'Mae Questel',
        'Gus Wickie',
      ],
      release: {
        date: '1936-11-27T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 16,
      genre: [
        'Cartoon',
      ],
      description: 'The legendary sailors Popeye and Sindbad do battle to see which one is the greatest.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2020-01-01',
      favorite: true,
    },
  },

  {
    id: 'f5d92da9-2ad5-4c25-9c11-bd3987aca857',
    comments: [],
    film_info: {
      title: 'Sagebrush Trail',
      alternative_title: 'Sagebrush Trail',
      total_rating: 5.4,
      poster: '/img/sagebrush-trail.jpg',
      age_rating: 6,
      director: 'Armand Schaefer',
      writers: [
        'Lindsley Parsons',
        'Will Beale',
      ],
      actors: [
        'John Wayne',
        'Nancy Shubert',
        'Lane Chandler',
      ],
      release: {
        date: '1933-12-15T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 54,
      genre: [
        'Western',
      ],
      description: 'A man framed for murder escapes prison and goes west, where he joins a gang with the real killer involved.',
    },
    user_details: {
      watchlist: false,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'e06c4c5a-c288-48f9-a38a-5d1d2b38e9f2',
    comments: [
      '89a52349-de50-469f-a4b6-ecc19a7fd97a',
    ],
    film_info: {
      title: 'Santa Claus Conquers the Martians',
      alternative_title: 'Santa Claus Conquers the Martians',
      total_rating: 2.7,
      poster: '/img/santa-claus-conquers-the-martians.jpg',
      age_rating: 12,
      director: 'Nicholas Webster',
      writers: [
        'Paul L. Jacobson',
      ],
      actors: [
        'John Call',
        'Leonard Hicks',
        'Vincent Beck',
      ],
      release: {
        date: '1964-11-14T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 81,
      genre: [
        'Comedy',
      ],
      description: 'The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'af130c4c-e5f5-4710-a913-eb2bebe2159c',
    comments: [],
    film_info: {
      title: 'The Dance of Life',
      alternative_title: 'The Dance of Life',
      total_rating: 6.8,
      poster: '/img/the-dance-of-life.jpg',
      age_rating: 12,
      director: 'John Cromwell',
      writers: [
        'Benjamin Glazer',
        'Julian Johnson',
      ],
      actors: [
        'Hal Skelly',
        'Nancy Carroll',
      ],
      release: {
        date: '1929-08-16T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 115,
      genre: [
        'Musical',
      ],
      description: 'When a vaudeville comic and a pretty young dancer have little luck in their separate careers, they decide to combine their acts; to save money on the road, they get married.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: '9a5ed0d7-a44d-44e9-8b87-81655e666f4b',
    comments: [
      '3344169b-949d-4788-af30-d3671bf5fb3d',
    ],
    film_info: {
      title: 'Casablanca',
      alternative_title: 'Casablanca',
      total_rating: 8.5,
      poster: '/img/casablanca.jpg',
      age_rating: 12,
      director: 'Michael Curtiz',
      writers: [
        'Julius J. Epstein',
        'Philip G. Epstein',
        'Howard Koch',
      ],
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Paul Henreid',
        'Claude Rains',
      ],
      release: {
        date: '1942-11-26T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 102,
      genre: [
        'Drama',
        'Romance',
      ],
      description: 'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2024-06-16',
      favorite: true,
    },
  },

  {
    id: '6cec0f8a-390d-47bc-9e59-7c22986189d2',
    comments: [],
    film_info: {
      title: 'Vertigo',
      alternative_title: 'Vertigo',
      total_rating: 8.3,
      poster: '/img/vertigo.jpg',
      age_rating: 12,
      director: 'Alfred Hitchcock',
      writers: [
        'Alec Coppel',
        'Samuel A. Taylor',
        'Pierre Boileau',
      ],
      actors: [
        'James Stewart',
        'Kim Novak',
        'Barbara Bel Geddes',
      ],
      release: {
        date: '1958-05-09T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 128,
      genre: [
        'Detective',
      ],
      description: 'A former San Francisco police detective juggles wrestling with his personal demons and becoming obsessed with the hauntingly beautiful woman he has been hired to trail, who may be deeply disturbed.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2023-01-01',
      favorite: true,
    },
  },

  {
    id: '3aa39a59-50f1-4edd-b68e-d55f1c106a24',
    comments: [],
    film_info: {
      title: 'Chinatown',
      alternative_title: 'Chinatown',
      total_rating: 8.1,
      poster: '/img/chinatown.jpg',
      age_rating: 18,
      director: 'Roman Polanski',
      writers: [
        'Robert Towne',
        'Roman Polanski',
      ],
      actors: [
        'Jack Nicholson',
        'Faye Dunaway',
        'John Huston',
      ],
      release: {
        date: '1974-06-20T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 131,
      genre: [
        'Detective',
        'Noir',
      ],
      description: 'A private detective hired to expose an adulterer in 1930s Los Angeles finds himself caught up in a web of deceit, corruption, and murder.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2022-05-23',
      favorite: true,
    },
  },

  {
    id: '683b1320-ec35-4f6c-ac7d-9bc1bf052fa7',
    comments: [],
    film_info: {
      title: 'Rear Window',
      alternative_title: 'Rear Window',
      total_rating: 8.5,
      poster: '/img/rear-window.jpg',
      age_rating: 12,
      director: 'Alfred Hitchcock',
      writers: [
        'John Michael Hayes',
        'Cornell Woolrich',
      ],
      actors: [
        'James Stewart',
        'Grace Kelly',
        'Wendell Corey',
      ],
      release: {
        date: '1954-09-01T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 112,
      genre: [
        'Detective',
        'Thriller',
      ],
      description: 'A bored photographer recovering from a broken leg passes the time by watching his neighbors and begins to suspect one of them of murder.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '002dee29-9ae8-4644-9cf1-e28892a402b9',
    comments: [],
    film_info: {
      title: 'Laura',
      alternative_title: 'Laura',
      total_rating: 7.9,
      poster: '/img/laura.jpg',
      age_rating: 6,
      director: 'Otto Preminger',
      writers: [
        'Vera Caspary',
        'Jay Dratler',
        'Samuel Hoffenstein',
      ],
      actors: [
        'Gene Tierney',
        'Dana Andrews',
        'Clifton Webb',
      ],
      release: {
        date: '1944-10-11T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 88,
      genre: [
        'Detective',
        'Noir',
      ],
      description: 'A police detective falls in love with the woman whose murder he is investigating.',
    },
    user_details: {
      watchlist: false,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'e98160f4-a3b9-4ecb-83da-ed1ca7a4ab7c',
    comments: [],
    film_info: {
      title: 'The Maltese Falcon',
      alternative_title: 'The Maltese Falcon',
      total_rating: 7.9,
      poster: '/img/maltese-falcon.jpg',
      age_rating: 12,
      director: 'John Huston',
      writers: [
        'John Huston',
        'Dashiell Hammett',
      ],
      actors: [
        'Humphrey Bogart',
        'Mary Astor',
        'Gladys George',
      ],
      release: {
        date: '1941-10-18T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 101,
      genre: [
        'Detective',
        'Noir',
      ],
      description: 'San Francisco private detective Sam Spade takes on a case that involves him with three eccentric criminals, a gorgeous liar and their quest for a priceless statuette, with the stakes rising after his partner is murdered.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: '4b6a1bdf-12ea-401d-8c0a-e095e3541331',
    comments: [],
    film_info: {
      title: 'North by Northwest',
      alternative_title: 'North by Northwest',
      total_rating: 8.3,
      poster: '/img/north-by-northwest.jpg',
      age_rating: 12,
      director: 'Alfred Hitchcock',
      writers: [
        'Ernest Lehman',
        'Gerald Devriès',
      ],
      actors: [
        'Cary Grant',
        'Eva Marie Saint',
        'James Mason',
      ],
      release: {
        date: '1959-07-01T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 136,
      genre: [
        'Detective',
        'Action',
      ],
      description: 'A New York City advertising executive goes on the run after being mistaken for a government agent by a group of foreign spies, and falls for a woman whose loyalties he begins to doubt.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2025-01-28',
      favorite: true,
    },
  },

  {
    id: '97d2c95d-34da-404e-bd77-c477aecfc41a',
    comments: [],
    film_info: {
      title: 'Blue Velvet',
      alternative_title: 'Blue Velvet',
      total_rating: 7.7,
      poster: '/img/blue-velvet.jpg',
      age_rating: 18,
      director: 'David Lynch',
      writers: [
        'David Lynch',
      ],
      actors: [
        'Isabella Rossellini',
        'Kyle MacLachlan',
        'Dennis Hopper',
      ],
      release: {
        date: '1986-09-19T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 120,
      genre: [
        'Detective',
        'Noir',
      ],
      description: 'The discovery of a severed human ear found in a field leads a young man on an investigation related to a beautiful, mysterious nightclub singer and a group of psychopathic criminals who have kidnapped her child.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2022-10-12',
      favorite: true,
    },
  },

  {
    id: '94b8b0fd-6547-40e0-bbf4-33509ed45246',
    comments: [],
    film_info: {
      title: 'Dial M for Murder',
      alternative_title: 'Dial M for Murder',
      total_rating: 8.2,
      poster: '/img/dial-m-for-murder.jpg',
      age_rating: 12,
      director: 'Alfred Hitchcock',
      writers: [
        'Frederick Knott',
        'Charles Dorat',
      ],
      actors: [
        'Ray Milland',
        'Grace Kelly',
        'Robert Cummings',
      ],
      release: {
        date: '1954-05-29T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 105,
      genre: [
        'Detective',
        'Thriller',
      ],
      description: 'A former tennis star arranges the murder of his adulterous wife.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: '4e396144-7810-4d91-8a7f-5fbb97cd35a2',
    comments: [],
    film_info: {
      title: 'The Usual Suspects',
      alternative_title: 'The Usual Suspects',
      total_rating: 8.5,
      poster: '/img/usual-suspects.jpg',
      age_rating: 18,
      director: 'Bryan Singer',
      writers: [
        'Christopher McQuarrie',
      ],
      actors: [
        'Kevin Spacey',
        'Gabriel Byrne',
        'Chazz Palminteri',
      ],
      release: {
        date: '1995-08-16T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 106,
      genre: [
        'Detective',
        'Crime',
      ],
      description: 'The sole survivor of a pier shoot-out tells the story of how a notorious criminal influenced the events that began with five criminals meeting in a seemingly random police lineup.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      ' ': false,
    },
  },

  {
    id: '27296bc4-280e-4626-954f-b807a11e8693',
    comments: [],
    film_info: {
      title: 'The Third Man',
      alternative_title: 'The Third Man',
      total_rating: 8.1,
      poster: '/img/third-man.jpg',
      age_rating: 12,
      director: 'Carol Reed',
      writers: [
        'Graham Greene',
        'Orson Welles',
        'Alexander Korda',
      ],
      actors: [
        'Orson Welles',
        'Joseph Cotten',
        'Alida Valli',
      ],
      release: {
        date: '1950-02-02T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 104,
      genre: [
        'Detective',
        'Noir',
      ],
      description: 'Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '0a940085-1cb5-48a8-96d5-e1dd62eebe62',
    comments: [],
    film_info: {
      title: '2001: A Space Odyssey',
      alternative_title: '2001: A Space Odyssey',
      total_rating: 8.3,
      poster: '/img/2001-space-odyssey.jpg',
      age_rating: 6,
      director: 'Stanley Kubrick',
      writers: [
        'Stanley Kubrick',
        'Arthur C. Clarke',
      ],
      actors: [
        'Keir Dullea',
        'Gary Lockwood',
        'William Sylvester',
      ],
      release: {
        date: '1968-05-01T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 139,
      genre: [
        'Sci-Fi',
      ],
      description: 'When a mysterious artifact is uncovered on the Moon, a spacecraft manned by two humans and one supercomputer is sent to Jupiter to find its origins.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '0e6a030d-1314-4c73-8d08-f4ac96321422',
    comments: [],
    film_info: {
      title: 'Star Wars: Episode IV - A New Hope',
      alternative_title: 'Star Wars: Episode IV - A New Hope',
      total_rating: 8.6,
      poster: '/img/star-wars-iv.jpg',
      age_rating: 12,
      director: 'George Lucas',
      writers: [
        'George Lucas',
      ],
      actors: [
        'Mark Hamill',
        'Harrison Ford',
        'Carrie Fisher',
      ],
      release: {
        date: '1977-05-25T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 121,
      genre: [
        'Sci-Fi',
        'Action',
      ],
      description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2019-03-18',
      favorite: false,
    },
  },

  {
    id: 'f50ad014-04d3-4abc-bfe2-9fd857c88f0f',
    comments: [],
    film_info: {
      title: 'E.T. the Extra-Terrestrial',
      alternative_title: 'E.T. the Extra-Terrestrial',
      total_rating: 7.9,
      poster: '/img/et.jpg',
      age_rating: 12,
      director: 'Steven Spielberg',
      writers: [
        'Melissa Mathison',
      ],
      actors: [
        'Henry Thomas',
        'Drew Barrymore',
        'Peter Coyote',
      ],
      release: {
        date: '1982-06-11T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 114,
      genre: [
        'Sci-Fi',
        'Family',
      ],
      description: 'A troubled child summons the courage to help a friendly alien escape from Earth and return to his home planet.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'b58144b3-83fd-475c-bdd4-66536369003f',
    comments: [],
    film_info: {
      title: 'A Clockwork Orange',
      alternative_title: 'A Clockwork Orange',
      total_rating: 8.2,
      poster: '/img/clockwork-orange.jpg',
      age_rating: 18,
      director: 'Stanley Kubrick',
      writers: [
        'Stanley Kubrick',
        'Anthony Burgess',
      ],
      actors: [
        'Malcolm McDowell',
        'Patrick Magee',
        'Michael Bates',
      ],
      release: {
        date: '1972-01-13T00:00:00.000Z',
        release_country: 'United Kingdom',
      },
      runtime: 136,
      genre: [
        'Sci-Fi',
        'Crime',
      ],
      description: 'Alex DeLarge and his droogs barbarize a decaying near-future.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2018-05-14',
      favorite: true,
    },
  },

  {
    id: '3c9657c0-1235-48c3-a6eb-d30e6b6f264a',
    comments: [],
    film_info: {
      title: 'The Day the Earth Stood Still',
      alternative_title: 'The Day the Earth Stood Still',
      total_rating: 7.7,
      poster: '/img/day-the-earth-stood-still.jpg',
      age_rating: 12,
      director: 'Robert Wise',
      writers: [
        'Edmund H. North',
        'Harry Bates',
      ],
      actors: [
        'Michael Rennie',
        'Patricia Neal',
        'Hugh Marlowe',
      ],
      release: {
        date: '1951-09-18T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 92,
      genre: [
        'Sci-Fi',
        'Drama',
      ],
      description: 'An alien lands in Washington, D.C. and tells the people of Earth that they must live peacefully or be destroyed as a danger to other planets.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '8adcf561-8a36-43ed-a70d-cd44602b741b',
    comments: [],
    film_info: {
      title: 'Blade Runner',
      alternative_title: 'Blade Runner',
      total_rating: 8.1,
      poster: '/img/blade-runner.jpg',
      age_rating: 16,
      director: 'Ridley Scott',
      writers: [
        'Hampton Fancher',
        'David Webb Peoples',
        'Philip K. Dick',
      ],
      actors: [
        'Harrison Ford',
        'Rutger Hauer',
        'Sean Young',
      ],
      release: {
        date: '1982-06-25T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 117,
      genre: [
        'Sci-Fi',
        'Cyberpunk',
      ],
      description: 'A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2024-09-16',
      favorite: true,
    },
  },

  {
    id: '78c58752-fc80-48e2-8bab-97ff876f5110',
    comments: [],
    film_info: {
      title: 'Alien',
      alternative_title: 'Alien',
      total_rating: 8.5,
      poster: '/img/alien.jpg',
      age_rating: 18,
      director: 'Ridley Scott',
      writers: [
        'Dan O\'Bannon',
        'Ronald Shusett',
      ],
      actors: [
        'Sigourney Weaver',
        'Tom Skerritt',
        'John Hurt',
      ],
      release: {
        date: '1979-05-25T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 116,
      genre: [
        'Sci-Fi',
        'Horror',
      ],
      description: 'After investigating a mysterious transmission of unknown origin, the crew of a commercial spacecraft encounters a deadly lifeform.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2015-05-03',
      favorite: true,
    },
  },

  {
    id: 'cd1abd77-54e2-4634-a504-7945d1c109be',
    comments: [],
    film_info: {
      title: 'Terminator 2: Judgment Day',
      alternative_title: 'Terminator 2: Judgment Day',
      total_rating: 8.6,
      poster: '/img/terminator-2.jpg',
      age_rating: 16,
      director: 'James Cameron',
      writers: [
        'James Cameron',
        'William Wisher',
      ],
      actors: [
        'Arnold Schwarzenegger',
        'Linda Hamilton',
        'Edward Furlong',
      ],
      release: {
        date: '1991-07-03T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 137,
      genre: [
        'Sci-Fi',
      ],
      description: 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son John from an even more advanced and powerful cyborg.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2006-04-12',
      favorite: true,
    },
  },

  {
    id: '863bf06b-48a4-42a5-9396-ccbff7f983b1',
    comments: [],
    film_info: {
      title: 'Invasion of the Body Snatchers',
      alternative_title: 'Invasion of the Body Snatchers',
      total_rating: 7.4,
      poster: '/img/invasion-of-the-body-snatchers.jpg',
      age_rating: 12,
      director: 'Philip Kaufman',
      writers: [
        'W.D. Richter',
        'Jack Finney',
      ],
      actors: [
        'Donald Sutherland',
        'Brooke Adams',
        'Jeff Goldblum',
      ],
      release: {
        date: '1956-02-05T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 80,
      genre: [
        'Sci-Fi',
        'Horror',
      ],
      description: 'When strange seeds drift to earth from space, mysterious pods begin to grow and invade San Francisco, replicating the city\'s residents one body at a time.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'e30cd21b-7f42-4dd7-808f-51e339e2b5c0',
    comments: [],
    film_info: {
      title: 'Back to the Future',
      alternative_title: 'Back to the Future',
      total_rating: 8.5,
      poster: '/img/back-to-the-future.jpg',
      age_rating: 6,
      director: 'Robert Zemeckis',
      writers: [
        'Robert Zemeckis',
        'Bob Gale',
      ],
      actors: [
        'Michael J. Fox',
        'Christopher Lloyd',
        'Lea Thompson',
      ],
      release: {
        date: '1985-07-03T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 116,
      genre: [
        'Sci-Fi',
        'Comedy',
      ],
      description: 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2017-01-02',
      favorite: true,
    },
  },

  {
    id: 'b657e809-a0ef-4df0-af8c-4d170f999b90',
    comments: [],
    film_info: {
      title: 'The Cabinet of Dr. Caligari',
      alternative_title: 'Das Cabinet des Dr. Caligari',
      total_rating: 8.0,
      poster: '/img/cabinet-of-dr-caligari.jpg',
      age_rating: 12,
      director: 'Robert Wiene',
      writers: [
        'Carl Mayer',
        'Hans Janowitz',
      ],
      actors: [
        'Werner Krauss',
        'Conrad Veidt',
        'Friedrich Feher',
      ],
      release: {
        date: '1920-02-26T00:00:00.000Z',
        release_country: 'Germany',
      },
      runtime: 74,
      genre: [
        'Thriller',
        'Horror',
      ],
      description: 'Hypnotist Dr. Caligari uses a somnambulist, Cesare, to commit murders.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2023-06-10',
      favorite: true,
    },
  },

  {
    id: '83674597-97f4-41a1-95e1-51663b139deb',
    comments: [],
    film_info: {
      title: 'Nanook of the North',
      alternative_title: 'Nanook of the North',
      total_rating: 7.6,
      poster: '/img/nanook-of-the-north.jpg',
      age_rating: 6,
      director: 'Robert J. Flaherty',
      writers: [
        'Frances H. Flaherty',
        'Robert J. Flaherty',
      ],
      actors: [
        'Allakariallak',
        'Alice Nevalinga',
        'Cunayou',
      ],
      release: {
        date: '1922-06-11T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 79,
      genre: [
        'Documentary',
      ],
      description: 'In this silent predecessor to the modern documentary, film-maker Robert J. Flaherty spends one year following the lives of Nanook and his family, Inuits living in the Arctic Circle.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'a86e57d1-ddf6-48f5-82b9-7631f574badb',
    comments: [],
    film_info: {
      title: 'Greed',
      alternative_title: 'Greed',
      total_rating: 8.0,
      poster: '/img/greed.jpg',
      age_rating: 12,
      director: 'Erich von Stroheim',
      writers: [
        'June Mathis',
        'Erich von Stroheim',
        'Frank Norris',
      ],
      actors: [
        'Gibson Gowland',
        'Zasu Pitts',
        'Jean Hersholt',
      ],
      release: {
        date: '1924-12-04T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 239,
      genre: [
        'Drama',
        'Western',
        'Thriller',
      ],
      description: 'The sudden fortune won from a lottery fans such destructive greed that it ruins the lives of the three people involved.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: 'a6f8e5b7-22b6-48cb-a0c0-182d83d75d6f',
    comments: [],
    film_info: {
      title: 'The Extraordinary Adventures of Mr. West in the Land of the Bolsheviks',
      alternative_title: 'Neobychainye priklyucheniya mistera Vesta v strane bolshevikov',
      total_rating: 6.4,
      poster: '/img/adventures-of-mr-west.jpg',
      age_rating: 12,
      director: 'Lev Kuleshov',
      writers: [
        'Nikolay Aseev',
        'Vsevolod Pudovkin',
      ],
      actors: [
        'Porfiri Podobed',
        'Boris Barnet',
        'Aleksandra Khokhlova',
      ],
      release: {
        date: '1924-04-27T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 86,
      genre: [
        'Comedy',
        'Fantasy',
      ],
      description: 'Experience the chronicle adventures of Mr. West and his faithful bodyguard and servant Jeddie, as they visit the land of the horrible and evil Bolsheviks.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: '4103151b-7eaa-43a4-b2e5-254dfd5fd1fc',
    comments: [],
    film_info: {
      title: 'Battleship Potemkin',
      alternative_title: 'Bronenosets Potyomkin',
      total_rating: 7.9,
      poster: '/img/bronenosets-potyomkin.jpg',
      age_rating: 12,
      director: 'Sergei Eisenstein',
      writers: [
        'Nina Agadzhanova',
        'Sergei Eisenstein',
        'Grigoriy Aleksandrov',
      ],
      actors: [
        'Aleksandr Antonov',
        'Vladimir Barskiy',
        'Grigoriy Aleksandrov',
      ],
      release: {
        date: '1925-12-21T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 74,
      genre: [
        'Drama',
        'War',
      ],
      description: 'In the midst of the Russian Revolution of 1905, the crew of the battleship Potemkin mutiny against the brutal, tyrannical regime of the vessel\'s officers. The resulting street demonstration in Odessa brings on a police massacre.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: '216be8a5-8690-4cef-b1c9-4da8fc8b3770',
    comments: [],
    film_info: {
      title: 'The Jazz Singer',
      alternative_title: 'The Jazz Singer',
      total_rating: 6.4,
      poster: '/img/jazz-singer.jpg',
      age_rating: 6,
      director: 'Alan Crosland',
      writers: [
        'Samson Raphaelson',
        'Alfred A. Cohn',
        'Jack Jarmuth',
      ],
      actors: [
        'Al Jolson',
        'May McAvoy',
        'Warner Oland',
      ],
      release: {
        date: '1927-10-06T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 96,
      genre: [
        'Musical',
        'Romance',
        'Drama',
      ],
      description: 'The son of a Jewish Cantor must defy the traditions of his religious father in order to pursue his dream of becoming a jazz singer.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: 'ec1258d0-343e-4b28-948c-56fa297ec174',
    comments: [],
    film_info: {
      title: 'Un chien andalou',
      alternative_title: 'Un chien andalou',
      total_rating: 7.6,
      poster: '/img/un-chien-andalou.jpg',
      age_rating: 16,
      director: 'Luis Buñuel',
      writers: [
        'Salvador Dalí',
        'Luis Buñuel',
      ],
      actors: [
        'Pierre Batcheff',
        'Simone Mareuil',
        'Luis Buñuel',
      ],
      release: {
        date: '1929-06-06T00:00:00.000Z',
        release_country: 'France',
      },
      runtime: 21,
      genre: [
        'Fantasy',
        'Horror',
      ],
      description: 'Luis Buñuel and Salvador Dalí present 16 minutes of bizarre, surreal imagery.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2024-09-16',
      favorite: true,
    },
  },

  {
    id: '02efc5e8-b5c5-4a4c-839b-1303cf66580d',
    comments: [],
    film_info: {
      title: 'The Passion of Joan of Arc',
      alternative_title: 'La passion de Jeanne d\'Arc',
      total_rating: 8.1,
      poster: '/img/passion-of-joan-of-arc.jpg',
      age_rating: 12,
      director: 'Carl Theodor Dreyer',
      writers: [
        'Joseph Delteil',
        'Carl Theodor Dreyer',
      ],
      actors: [
        'Maria Falconetti',
        'Eugene Silvain',
        'André Berley',
      ],
      release: {
        date: '1928-10-25T00:00:00.000Z',
        release_country: 'France',
      },
      runtime: 82,
      genre: [
        'Drama',
        'History',
      ],
      description: 'In 1431, Jeanne d\'Arc is placed on trial on charges of heresy. The ecclesiastical jurists attempt to force Jeanne to recant her claims of holy visions.',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2024-08-14',
      favorite: true,
    },
  },

  {
    id: '96ce3eae-decf-471f-8edf-797478fe16c0',
    comments: [],
    film_info: {
      title: 'Man with a Movie Camera',
      alternative_title: 'Chelovek s kino-apparatom',
      total_rating: 8.3,
      poster: '/img/man-with-movie-camera.jpg',
      age_rating: 6,
      director: 'Dziga Vertov',
      writers: [
        'Dziga Vertov',
      ],
      actors: [
        'Mikhail Kaufman',
        'Elizaveta Svilova',
      ],
      release: {
        date: '1929-01-07T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 68,
      genre: [
        'Documentary',
      ],
      description: 'A man travels around a city with a camera slung over his shoulder, documenting urban life with dazzling invention.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: true,
    },
  },

  {
    id: '28468a9c-2de6-4558-ab09-77962872e3bb',
    comments: [],
    film_info: {
      title: 'King Kong',
      alternative_title: 'King Kong',
      total_rating: 7.9,
      poster: '/img/king-kong.jpg',
      age_rating: 12,
      director: 'Merian C. Cooper',
      writers: [
        'James Ashmore Creelman',
        'Ruth Rose',
        'Merian C. Cooper',
      ],
      actors: [
        'Fay Wray',
        'Robert Armstrong',
        'Bruce Cabot',
      ],
      release: {
        date: '1933-04-07T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 100,
      genre: [
        'Adventure',
        'Horror',
      ],
      description: 'A film crew goes to a tropical island for a location shoot, where they capture a colossal ape who takes a shine to their blonde starlet, and bring him back to New York City.',
    },
    user_details: {
      watchlist: false,
      already_watched: true,
      watching_date: '2025-01-05',
      favorite: true,
    },
  },

  {
    id: '62fe052e-ff8b-4975-b6e5-4895275e9799',
    comments: [],
    film_info: {
      title: 'Citizen Kane',
      alternative_title: 'Citizen Kane',
      total_rating: 8.3,
      poster: '/img/citizen-kane.jpg',
      age_rating: 12,
      director: 'Orson Welles',
      writers: [
        'Herman J. Mankiewicz',
        'Orson Welles',
        'John Houseman',
      ],
      actors: [
        'Orson Welles',
        'Joseph Cotten',
        'Dorothy Comingore',
      ],
      release: {
        date: '1941-09-05T00:00:00.000Z',
        release_country: 'United States',
      },
      runtime: 114,
      genre: [
        'Epic',
        'Drama',
      ],
      description: 'Following the death of publishing tycoon Charles Foster Kane, reporters scramble to uncover the meaning of his final utterance: \'Rosebud.\'',
    },
    user_details: {
      watchlist: true,
      already_watched: true,
      watching_date: '2023-07-23',
      favorite: true,
    },
  },

  {
    id: '587d9620-3ade-4e19-ae04-6de1c69004ec',
    comments: [],
    film_info: {
      title: 'Earth',
      alternative_title: 'Zemlya',
      total_rating: 7.2,
      poster: '/img/earth.jpg',
      age_rating: 6,
      director: 'Aleksandr Dovzhenko',
      writers: [
        'Aleksandr Dovzhenko',
      ],
      actors: [
        'Stepan Shkurat',
        'Semyon Svashenko',
        'Yuliya Solntseva',
      ],
      release: {
        date: '1930-04-08T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 76,
      genre: [
        'Drama',
      ],
      description: 'In the peaceful countryside, Vassily opposes the rich kulaks over the coming of collective farming.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '8bb8e2b0-5c60-4e31-ab79-f83afbc8aa4f',
    comments: [],
    film_info: {
      title: 'Road to Life',
      alternative_title: 'Putyovka v zhizn',
      total_rating: 6.8,
      poster: '/img/road-to-life.jpg',
      age_rating: 6,
      director: 'Nikolai Ekk',
      writers: [
        'Osip Brik',
        'Nikolai Ekk',
        'Anton Makarenko',
      ],
      actors: [
        'Nikolay Batalov',
        'Yvan Kyrlya',
        'Mikhail Dzhagofarov',
      ],
      release: {
        date: '1931-09-30T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 119,
      genre: [
        'Drama',
        'Crime',
      ],
      description: 'Young hobos are brought to a new camp to become good Soviet citizens. This camp works without any guards. But crooks kill one of the young people when they try to damage the newly build railroad to that camp.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '2086c16d-a820-494a-b3b9-74347e663beb',
    comments: [],
    film_info: {
      title: 'Outskirts',
      alternative_title: 'Okraina',
      total_rating: 7.0,
      poster: '/img/outskirts.jpg',
      age_rating: 12,
      director: 'Boris Barnet',
      writers: [
        'Konstantin Finn',
        'Boris Barnet',
      ],
      actors: [
        'Yelena Kuzmina',
        'Mikhail Zharov',
        'Nikolay Bogolyubov',
      ],
      release: {
        date: '1933-03-25T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 98,
      genre: [
        'Drama',
        'War',
      ],
      description: 'Outskirts is an internationally renowned masterpiece of early sound cinema. In a remote Russian village during World War I, colorful and nuanced characters experience divided loyalties: family loyalty vs. personal desire, nationalism vs. transcendent humanism.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '21232c79-2404-4557-b6a6-102afdea533c',
    comments: [],
    film_info: {
      title: 'Loss of Feeling',
      alternative_title: 'Gibel sensatsii',
      total_rating: 6.5,
      poster: '/img/loss-of-feeling.jpg',
      age_rating: 12,
      director: 'Aleksandr Andriyevsky',
      writers: [
        'Georgiy Grebner',
        'Karel Capek',
      ],
      actors: [
        'Sergei Vecheslov',
        'Vladimir Gardin',
        'Mariya Volgina',
      ],
      release: {
        date: '1935-04-17T00:00:00.000Z',
        release_country: 'Soviet Union',
      },
      runtime: 85,
      genre: [
        'Fantasy',
        'Sci-Fi',
      ],
      description: 'In an unnamed English-speaking capitalist land, a young engineer invents inexhaustible giant robots to replace the fragile human workers on high-volume assembly-lines, and soon finds his invention co-opted by the military-industrial complex.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: 'd7be0101-93fe-4191-a27d-539668d12266',
    comments: [],
    film_info: {
      title: 'The Grand Illusion',
      alternative_title: 'La grande illusion',
      total_rating: 8.1,
      poster: '/img/grand-illusion.jpg',
      age_rating: 16,
      director: 'Jean Renoir',
      writers: [
        'Charles Spaak',
        'Jean Renoir',
      ],
      actors: [
        'Jean Gabin',
        'Dita Parlo',
        'Pierre Fresnay',
      ],
      release: {
        date: '1937-06-08T00:00:00.000Z',
        release_country: 'France',
      },
      runtime: 114,
      genre: [
        'War',
        'Drama',
      ],
      description: 'During WWI, two French soldiers are captured and imprisoned in a German P.O.W. camp. Several escape attempts follow until they are eventually sent to a seemingly inescapable fortress.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },

  {
    id: '2f6b2c15-b5ac-446c-bb72-e331135d83b1',
    comments: [],
    film_info: {
      title: 'Olympia',
      alternative_title: 'Olympia',
      total_rating: 7.7,
      poster: '/img/olympia.jpg',
      age_rating: 16,
      director: 'Leni Riefenstahl',
      writers: [
        'Leni Riefenstahl',
      ],
      actors: [
        'David Albritton',
        'Arvo Askola',
        'Jack Beresford',
      ],
      release: {
        date: '1938-04-20T00:00:00.000Z',
        release_country: 'Germany',
      },
      runtime: 226,
      genre: [
        'Documentary',
        'Sport',
      ],
      description: 'The document of the 1936 Olympics at Berlin.',
    },
    user_details: {
      watchlist: true,
      already_watched: false,
      watching_date: null,
      favorite: false,
    },
  },
];

module.exports = {
  films,
};
