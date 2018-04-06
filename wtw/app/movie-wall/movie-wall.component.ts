import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Input() width: number;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    movies: Array<any>;
    dataLoaded: boolean;

    constructor(private movieDBService: MovieDBService, private router: Router) { }

    ngOnInit() {
        if (!this.width) this.width = 100;
        this.dataLoaded = false;
        this.movieDBService.getMovies(this.movieIds, this.lang).subscribe(data => {
            this.movies = data.json();
            this.dataLoaded = true;
        },
        err => {
            throw new Error(err);
        });
    }

    showQuestionnaire(id: number) {
        this.notify.emit({
            movieId: id
        });
    }
}