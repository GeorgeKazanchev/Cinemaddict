export default class FilmCardData {
    constructor(title: string, rating: string, year: number, duration: string,
        genre: string, poster: string, description: string, commentsCount: string) {
        this.title = title;
        this.rating = rating;
        this.year = year;
        this.duration = duration;
        this.genre = genre;
        this.poster = poster;
        this.description = description;
        this.commentsCount = commentsCount;
    }

    title: string;
    rating: string;
    year: number;
    duration: string;
    genre: string;
    poster: string;
    description: string;
    commentsCount: string;
}