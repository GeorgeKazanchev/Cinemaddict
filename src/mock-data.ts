import FilmInfo from './types/film-info';
import Movie from './types/movie';
import ReleaseInfo from './types/release-info';
import UserData from './types/user-data';
import UserDetails from './types/user-details';

const userData: UserData = new UserData(
    'Frank Sinatra',
    25,
    './img/bitmap@2x.png'
);

const films: Movie[] = [
    new Movie(
        '841c7b78-f1f0-4635-9b67-82b9fcfb2675',
        [],
        new FilmInfo(
            'The Man with the Golden Arm',
            'The Man with the Golden Arm',
            './img/posters/the-man-with-the-golden-arm.jpg',
            'Otto Preminger',
            'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
            9.0,
            0,
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
                '1955',
                'United States'
            )
        ),
        new UserDetails(
            true,
            false,
            true,
            '2019-07-03'
        )
    ),
    new Movie(
        '65443dba-ae1d-4cbf-9f26-c6fcacd3c538',
        [],
        new FilmInfo(
            'The Great Flamarion',
            'The Great Flamarion',
            './img/posters/the-great-flamarion.jpg',
            'Anthony Mann',
            'The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…',
            8.9,
            0,
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
                '1945',
                'United States'
            )
        ),
        new UserDetails(
            true,
            true,
            false,
            ''
        )
    ),
    new Movie(
        'f3fb372a-e03e-4414-b9fb-66cafc0e0f36',
        [],
        new FilmInfo(
            'Made for Each Other',
            'Made for Each Other',
            './img/posters/made-for-each-other.png',
            'John Cromwell',
            'John Mason (James Stewart) is a young, somewhat timid attorney in New York City. He has been doing his job well, and he has a chance of bei…',
            5.8,
            0,
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
                '1939',
                'United States'
            )
        ),
        new UserDetails(
            true,
            false,
            true,
            '2021-03-01'
        )
    )
];

export { userData, films };
