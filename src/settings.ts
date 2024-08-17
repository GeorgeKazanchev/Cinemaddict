import UserData from './ts/types/user-data';

export const FILMS_CHUNK_SIZE: number = 5;
export const NEW_COMMENT_EMOJI_SIZE: number = 55;
export const STATS_SHOWN_GENRES_COUNT: number = 4;
export const SERVER_ORIGIN: string = 'https://localhost:7127';
export const AUTHORIZATION_STRING: string = 'er883jdzbdw';

export const userData: UserData = new UserData(
    'Frank Sinatra',
    './img/bitmap@2x.png'
);
