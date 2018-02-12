import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'tv-wall',
    templateUrl: 'tv-wall.component.html'
})

export class TVWallComponent {
    @Input() movieIds: Array<number>;
    @Input() lang: string;
    @Input() config: any;
    @Input() width: number;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    tvshows: Array<any>;
    dataLoaded: boolean;

    constructor(private movieDBService: MovieDBService, private router: Router) { }

    ngOnInit() {
        if (!this.width) this.width = 100;
        this.dataLoaded = false;
        this.movieDBService.getTVShows(this.movieIds, this.lang).subscribe(data => {
            this.tvshows = data.json();
            this.dataLoaded = true;
        },
        err => {
            this.router.navigate(['error']);
        });
    }

    showQuestionnaire(id: number) {
        this.notify.emit({
            movieId: id
        });
    }
}