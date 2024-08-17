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
}
