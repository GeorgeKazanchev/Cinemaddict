import ReleaseInfo from './release-info';

type FilmInfo = {
  actors: string[];
  ageRating: number;
  alternativeTitle: string;
  description: string;
  director: string;
  durationMinutes: number;
  genres: string[];
  posterSrc: string;
  rating: number;
  release: ReleaseInfo;
  title: string;
  writers: string[];
};

export default FilmInfo;
