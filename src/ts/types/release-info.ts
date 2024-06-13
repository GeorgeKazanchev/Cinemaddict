export default class ReleaseInfo {
    constructor(date: string, releaseCountry: string) {
        this.date = date;
        this.releaseCountry = releaseCountry;
    }

    date: string;
    releaseCountry: string;
}