import Comment from './ts/types/comment';
import Emotion from './ts/types/emotion';
import FilmInfo from './ts/types/film-info';
import Movie from './ts/types/movie';
import ReleaseInfo from './ts/types/release-info';
import UserDetails from './ts/types/user-details';

export const films: Movie[] = [
    new Movie(
        '841c7b78-f1f0-4635-9b67-82b9fcfb2675',
        [
            '50a689fb-90e9-48f8-937e-8028029b8fe8',
            '1addf30c-170e-414a-92bb-0975c8c3f242'
        ],
        new FilmInfo(
            'The Man with the Golden Arm',
            'The Man with the Golden Arm',
            './img/debug-posters/the-man-with-the-golden-arm.jpg',
            'Otto Preminger',
            'A junkie must face his true self to kick his drug addiction.',
            9.0,
            6,
            119,
            [
                'Walter Newman',
                'Lewis Meltzer',
                'Ben Hecht'
            ],
            [
                'Frank Sinatra',
                'Eleanor Parker',
                'Kim Novak'
            ],
            [
                'Drama'
            ],
            new ReleaseInfo(
                new Date('1955-12-15T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            true,
            false,
            true,
            new Date('2023-07-03')
        )
    ),

    new Movie(
        '65443dba-ae1d-4cbf-9f26-c6fcacd3c538',
        [],
        new FilmInfo(
            'The Great Flamarion',
            'The Great Flamarion',
            './img/debug-posters/the-great-flamarion.jpg',
            'Anthony Mann',
            'Part of an entertainment act, a beautiful but unscrupulous female performer manipulates all the men in her life in order to achieve her aims.',
            8.9,
            6,
            78,
            [
                'Heinz Herald',
                'Richard Weil',
                'Anne Wigton'
            ],
            [
                'Erich von Stroheim',
                'Mary Beth Hughes'
            ],
            [
                'Mystery'
            ],
            new ReleaseInfo(
                new Date('1945-03-30T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            true,
            true,
            false,
            null
        )
    ),

    new Movie(
        'f3fb372a-e03e-4414-b9fb-66cafc0e0f36',
        [
            'efffcc91-74cd-4b85-a9f2-62fd4eeca31f'
        ],
        new FilmInfo(
            'Made for Each Other',
            'Made for Each Other',
            './img/debug-posters/made-for-each-other.png',
            'John Cromwell',
            'While on a business trip, an ambitious young lawyer meets and immediately falls in love with a stranger. They wed the following day, and tragedy soon strikes.',
            5.8,
            6,
            92,
            [
                'Jo Swerling',
                'Frank Ryan'
            ],
            [
                'Carole Lombard',
                'James Stewart'
            ],
            [
                'Comedy'
            ],
            new ReleaseInfo(
                new Date('1939-02-10T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            true,
            false,
            true,
            new Date('2024-05-25')
        )
    ),

    new Movie(
        '50ad3cb1-9dd5-433b-badf-09b209453875',
        [],
        new FilmInfo(
            'Popeye the Sailor Meets Sindbad the Sailor',
            'Popeye the Sailor Meets Sindbad the Sailor',
            './img/debug-posters/popeye-meets-sinbad.png',
            'Dave Fleischer',
            'The legendary sailors Popeye and Sindbad do battle to see which one is the greatest.',
            6.3,
            6,
            16,
            [
                'Joe Stultz',
                'Bill Turner',
                'Jack Ward'
            ],
            [
                'Jack Mercer',
                'Mae Questel',
                'Gus Wickie'
            ],
            [
                'Cartoon'
            ],
            new ReleaseInfo(
                new Date('1936-11-27T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            true,
            false,
            true,
            new Date('2020-01-01')
        )
    ),

    new Movie(
        'f5d92da9-2ad5-4c25-9c11-bd3987aca857',
        [],
        new FilmInfo(
            'Sagebrush Trail',
            'Sagebrush Trail',
            './img/debug-posters/sagebrush-trail.jpg',
            'Armand Schaefer',
            'A man framed for murder escapes prison and goes west, where he joins a gang with the real killer involved.',
            5.4,
            6,
            54,
            [
                'Lindsley Parsons',
                'Will Beale'
            ],
            [
                'John Wayne',
                'Nancy Shubert',
                'Lane Chandler'
            ],
            [
                'Western'
            ],
            new ReleaseInfo(
                new Date('1933-12-15T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            false,
            false,
            false,
            null
        )
    ),

    new Movie(
        'e06c4c5a-c288-48f9-a38a-5d1d2b38e9f2',
        [
            '89a52349-de50-469f-a4b6-ecc19a7fd97a'
        ],
        new FilmInfo(
            'Santa Claus Conquers the Martians',
            'Santa Claus Conquers the Martians',
            './img/debug-posters/santa-claus-conquers-the-martians.jpg',
            'Nicholas Webster',
            'The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.',
            2.7,
            12,
            81,
            [
                'Paul L. Jacobson'
            ],
            [
                'John Call',
                'Leonard Hicks',
                'Vincent Beck'
            ],
            [
                'Comedy'
            ],
            new ReleaseInfo(
                new Date('1964-11-14T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            false,
            true,
            false,
            null
        )
    ),

    new Movie(
        'af130c4c-e5f5-4710-a913-eb2bebe2159c',
        [],
        new FilmInfo(
            'The Dance of Life',
            'The Dance of Life',
            './img/debug-posters/the-dance-of-life.jpg',
            'John Cromwell',
            'When a vaudeville comic and a pretty young dancer have little luck in their separate careers, they decide to combine their acts; to save money on the road, they get married.',
            6.8,
            12,
            115,
            [
                'Benjamin Glazer',
                'Julian Johnson'
            ],
            [
                'Hal Skelly',
                'Nancy Carroll'
            ],
            [
                'Musical'
            ],
            new ReleaseInfo(
                new Date('1929-08-16T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            true,
            true,
            false,
            null
        )
    ),

    new Movie(
        '9a5ed0d7-a44d-44e9-8b87-81655e666f4b',
        [
            '3344169b-949d-4788-af30-d3671bf5fb3d'
        ],
        new FilmInfo(
            'Casablanca',
            'Casablanca',
            './img/debug-posters/casablanca.jpg',
            'Michael Curtiz',
            'A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.',
            8.5,
            12,
            102,
            [
                'Julius J. Epstein',
                'Philip G. Epstein',
                'Howard Koch'
            ],
            [
                'Humphrey Bogart',
                'Ingrid Bergman',
                'Paul Henreid',
                'Claude Rains'
            ],
            [
                'Drama',
                'Romance'
            ],
            new ReleaseInfo(
                new Date('1942-11-26T00:00:00.000Z'),
                'United States'
            )
        ),
        new UserDetails(
            true,
            true,
            false,
            null
        )
    )
];

export const comments: Comment[] = [
    new Comment(
        '50a689fb-90e9-48f8-937e-8028029b8fe8',
        'RALL',

        'This great movie brought out into the open the horrors of heroin addiction. It captured the struggle of a ' +
        'man, Frankie Machine, with a "monkey on his back". Frank Sinatra did his homework, well. The acting is ' +
        'superb, the score is first rate and the actors all gave above average performances. Frank gave one of his ' +
        'best performances. This movie has much to offer.',

        new Date('1999-12-11T00:00:00.000Z'),
        Emotion.Smile
    ),
    new Comment(
        '1addf30c-170e-414a-92bb-0975c8c3f242',
        'bull-frog',

        'It\'s hard to believe this movie did not get censorship approval. No where in the film do the characters ' +
        'mention what drug was involved or that drugs were even being used. Really the story teaches a morality ' +
        'lesson and that should be applauded.',

        new Date('2008-04-04T00:00:00.000Z'),
        Emotion.Smile
    ),
    new Comment(
        'efffcc91-74cd-4b85-a9f2-62fd4eeca31f',
        'MerryArtist',

        'As a whole, this movie doesn\'t work at all. Different parts of the story jump around here and there ' +
        'and fail to form a cohesive piece -- the result of a poorly written script. For instance, halfway into ' +
        'the movie and you still get no idea of where it is all going. You get a vague sense that Johnny\'s ' +
        '(Jimmy Stewart) inability to support his family and the consequent strain on his relationship with his ' +
        'wife is part of the main plot, only to be completely thrown off by a new development in the story, which ' +
        'doesn\'t fit into the first portion of the film at all. It\'s almost like watching two different stories ' +
        'at the same time.',

        new Date('2008-07-27T00:00:00.000Z'),
        Emotion.Sleeping
    ),
    new Comment(
        '89a52349-de50-469f-a4b6-ecc19a7fd97a',
        'JamesMovieGuy_117',

        'Martians kidnap Santa Claus due to an elder\'s belief that the Martian children need to experience ' +
        'Christmas and the joys of childhood. This leads to two human children discovering the conspiracy and ' +
        'work to get Santa Claus back by Christmas.',

        new Date('2017-12-24T00:00:00.000Z'),
        Emotion.Angry
    ),
    new Comment(
        '3344169b-949d-4788-af30-d3671bf5fb3d',
        'gigan-92',

        'This film is a monumental piece of film history. I can honestly it might just be one of the best movies of all time. ' +
        'If anything, you have to acknowledge the writing. Almost every single line of dialogue in the film is a household ' +
        'terminology to this day, most people paying tribute to the film without even knowing it. That\'s why I wanted to use ' +
        'a less popular quote for the title, and it has its own meanings within the film. Another joy of the film is composer ' +
        'Max Steiner; yes, Max Steiner of 1933\'s "King Kong". His music is timeless, and he captures the mystery and romance of the film perfectly.',
        new Date('2012-02-01T00:00:00.000Z'),

        Emotion.Smile
    )
];
