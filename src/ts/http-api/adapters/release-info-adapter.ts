import ReleaseInfo from '../../types/release-info';
import { ReleaseInfoDto } from '../dto';

export default class ReleaseInfoAdapter {
    public static fromDto(releaseInfoDto: ReleaseInfoDto): ReleaseInfo {
        return new ReleaseInfo(
            new Date(releaseInfoDto['date']),
            releaseInfoDto['release_country']
        );
    }

    public static toDto(releaseInfo: ReleaseInfo): ReleaseInfoDto {
        return {
            'date': releaseInfo.date,
            'release_country': releaseInfo.releaseCountry
        };
    }
}
