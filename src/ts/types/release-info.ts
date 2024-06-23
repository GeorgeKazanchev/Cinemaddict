export default class ReleaseInfo {
    constructor(date: Date, releaseCountry: string) {
        this.date = date;
        this.releaseCountry = releaseCountry;
    }

    date: Date;
    releaseCountry: string;
}
