export type ReleaseInfoDto = {
    'release_country': string,
    'date': Date
};

export type FilmInfoDto = {
    'title': string,
    'alternative_title': string,
    'total_rating': number,
    'poster': string,
    'age_rating': number,
    'runtime': number,
    'description': string,
    'director': string,
    'genre': string[],
    'writers': string[],
    'actors': string[],
    'release': ReleaseInfoDto
};

export type UserDetailsDto = {
    'watchlist': boolean,
    'already_watched': boolean,
    'favorite': boolean,
    'watching_date': Date | null
};

export type MovieDto = {
    'id': string,
    'comments': string[],
    'film_info': FilmInfoDto,
    'user_details': UserDetailsDto
};
