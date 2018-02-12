import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieDBService } from '../movieDB/movieDB.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'timeline-event-rate-movie',
    templateUrl: 'timeline-event-rate-movie.component.html'
})

export class TimelineEventRateMovieComponent {
    @Input() curUserId: number;
    @Input() friends: Array<any>;
    @Input() isCurUserYou: boolean;
    @Input() questionnaire: any;
    @Input() isTV: boolean;
    @Input() config: any;
    @Input() lang: string;
    curUsername: string;
    isLoading: boolean;
    movie: any;

    constructor(private movieDBService: MovieDBService, private router: Router) { }

    ngOnInit() {
        this.isLoading = true;
        if (!this.isCurUserYou) {
            var curUserId = this.curUserId;
            this.curUsername = _.find(this.friends, function (f) { return f.userId == curUserId }).username;
        }
        if (!this.isTV) {
            this.movieDBService.getMovie(this.questionnaire.movieDBId, this.lang).subscribe(data => {
                this.movie = data.json();
                this.isLoading = false;
            },
                err => {
                    this.router.navigate(['error']);
                });
        }
        else {
            this.movieDBService.getTV(this.questionnaire.movieDBId, this.lang).subscribe(data => {
                this.movie = data.json();
                this.isLoading = false;
            },
                err => {
                    this.router.navigate(['error']);
                });
        }
        
    }
}