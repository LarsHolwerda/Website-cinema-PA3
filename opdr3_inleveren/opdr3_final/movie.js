export default class Movie {
    constructor(
        plot,
        writer, 
        actors, 
        releaseYear,
        title, 
        director,
        timeslot,
        movieNumber
    ) {
      this.title = title;
      this.writer = writer;
      this.actors = actors;
      this.releaseYear = releaseYear;
      this.plot = plot;
      this.director = director;
      this.timeslot = timeslot;
      this.movieNumber = movieNumber;
    }
}