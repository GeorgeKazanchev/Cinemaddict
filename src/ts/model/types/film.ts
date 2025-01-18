import FilmInfo from './film-info';
import UserDetails from './user-details';

type Film = {
  commentsIds: string[];
  id: string;
  info: FilmInfo,
  userDetails: UserDetails,
};

export default Film;
