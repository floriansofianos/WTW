import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';

@Component({
    moduleId: module.id,
    selector: 'movie-wall',
    templateUrl: 'movie-wall.component.html'
})

export class MovieWallComponent {
    @Input() movieIds: Array<number>;
    @Input() lang: string;
    @Input() config: any;
    movies: Array<any>;
    dataLoaded: boolean;

    constructor(private movieDBService: MovieDBService, private router: Router) { }

    ngOnInit() {
        this.dataLoaded = false;
        this.movieDBService.getMovies(this.movieIds, this.lang).subscribe(data => {
            this.movies = data.json();
            this.dataLoaded = true;
        },
        err => {
            this.router.navigate(['error']);
        });
    }
}