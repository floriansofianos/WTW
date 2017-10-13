﻿import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MovieRecommandationService } from '../movie/movie-recommandation.service';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service';
import { TranslateService } from '@ngx-translate/core';
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
    movie: any;
    movieQuestionnaireInit: any;
    movieQuestionnaireInitLoaded: boolean;
    movieQuestionnaire: any;
    showSaveSpinner: boolean;
    isLoading: boolean;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private movieRecommandation: MovieRecommandationService, private movieQuestionnaireService: MovieQuestionnaireService, private translate: TranslateService) { }

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
        this.isLoading = true;
        this.loadMovie(event.movieId);
    }

    loadMovie(id: number) {
        this.movieQuestionnaireService.get(id).subscribe(
            data => {
                this.movieQuestionnaireInit = data.json();
                this.movieDBService.getMovie(id, this.translate.currentLang).subscribe(
                    data => {
                        this.movie = data.json();
                        this.movieQuestionnaireInitLoaded = true;
                        this.isLoading = false;
                    },
                    error => {
                        this.router.navigate(['/error']);
                    }
                );
            },
            error => {
                this.router.navigate(['/error']);
            }
        );
    }

    clickSearch() {
        this.isLoading = true;
        this.movieDBService.wtw(this.lang, this.formWTW.genreSelectValue, this.formWTW.isWatchlistChecked, this.formWTW.isRuntimeChecked, this.formWTW.runtimeLimit).subscribe(response => {
            // load existing data regarding this movie for the current user
            var id = response.json().id;
            this.loadMovie(id);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    movieQuestionnaireChange(event) {
        this.movieQuestionnaire = event;
    }

    back() {
        this.movieQuestionnaire = null;
        this.movie = null;
        this.movieQuestionnaireInitLoaded = false;
    }

    movieQuestionnaireSave() {
        // Add the questionnaire to DB
        this.showSaveSpinner = true;
        // Save data in DB
        if (this.movieQuestionnaire) this.movieQuestionnaireService.create(this.movieQuestionnaire).subscribe(response => {
            this.showSaveSpinner = false;
            this.back();
        },
            error => {
                this.router.navigate(['error']);
            });
    }
    
}