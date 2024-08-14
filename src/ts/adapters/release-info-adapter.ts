import ReleaseInfo from '../types/release-info';
import { ReleaseInfoDto } from '../types/dto';

export default class ReleaseInfoAdapter {
    public static fromDto(releaseInfoDto: ReleaseInfoDto): ReleaseInfo {
        return new ReleaseInfo(
            new Date(releaseInfoDto['date']),
            releaseInfoDto['release_country']
        );
    }
}
