type FilmDto = {
  comments: string[];
  film_info: {
    actors: string[];
    age_rating: number;
    alternative_title: string;
    description: string;
    director: string;
    genre: string[];
    poster: string;
    release: {
      date: string;
      release_country: string;
    },
    runtime: number;
    title: string;
    total_rating: number;
    writers: string[];
  },
  id: string;
  user_details: {
    already_watched: boolean;
    favorite: boolean;
    watching_date: string | null;
    watchlist: boolean;
  },
};

export default FilmDto;
