﻿import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MovieRecommandationService } from '../movie/movie-recommandation.service';
import { MatSelectModule, MatCheckboxModule, MatSliderModule } from '@angular/material';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-what-to-watch-page.component.html',
})

export class UserWhatToWatchPageComponent {
    configuration: any;
    lang: string;
    recommandationIds: Array<any>;
    noReco: boolean;
    genres: Array<any>;
    formWTW: any;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private movieRecommandation: MovieRecommandationService) { }

    ngOnInit() {
        this.formWTW = {};
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.movieDBService.getMovieDBConfiguration().subscribe(response => {
                this.configuration = response.json();
            },
                error => {
                    this.router.navigate(['error']);
                });
        }
        else {
            this.router.navigate(['']);
        }
        this.lang = currentUser.lang;
        this.formWTW.isRuntimeChecked = false;
        this.movieDBService.getAllGenres().subscribe(response => {
            this.genres = response.json();
            this.movieRecommandation.getAll().subscribe(response => {
                if (response.json().length > 0) {
                    this.recommandationIds = _.sample(_.map(response.json(), 'movieDBId'), 5);
                }
                else this.noReco = true;
            },
                error => {
                    this.router.navigate(['error']);
                });
        },
            error => {
                this.router.navigate(['error']);
            });
        
    }

    onClickMovie(event) {

    }

    clickSearch() {
        this.movieDBService.wtw(this.lang, this.formWTW.genreSelectValue, this.formWTW.isWatchlistChecked, this.formWTW.isRuntimeChecked, this.formWTW.runtimeLimit).subscribe(response => {
            console.log(response.json());
        },
            error => {
                this.router.navigate(['error']);
            });
        console.log(this.formWTW);
    }

    
}