import UserDetails from '../../types/user-details';
import { UserDetailsDto } from '../dto';

export default class UserDetailsAdapter {
    public static fromDto(userDetailsDto: UserDetailsDto): UserDetails {
        return new UserDetails(
            userDetailsDto['favorite'],
            userDetailsDto['watchlist'],
            userDetailsDto['already_watched'],
            userDetailsDto['watching_date'] !== null ? new Date(userDetailsDto['watching_date']) : null
        );
    }

    public static toDto(userDetails: UserDetails): UserDetailsDto {
        return {
            'favorite': userDetails.favorite,
            'watchlist': userDetails.watchlist,
            'already_watched': userDetails.alreadyWatched,
            'watching_date': userDetails.watchingDate
        };
    }
}
