﻿import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MovieRecommandationService } from '../movie/movie-recommandation.service';
import { TVRecommandationService } from '../tv/tv-recommandation.service';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectModule, MatCheckboxModule, MatSliderModule } from '@angular/material';
import { LanguagesService } from '../languages/languages.service';
import { SocialService } from '../social/social.service';
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
    formTVWTW: any;
    movie: any;
    movieQuestionnaireInit: any;
    movieQuestionnaireInitLoaded: boolean;
    movieQuestionnaire: any;
    showSaveSpinner: boolean;
    isLoading: boolean;
    username: string;
    noResults: boolean;
    noTVResults: boolean;
    notValidReleaseDates: boolean;
    notValidTVReleaseDates: boolean;
    showPlex: boolean;
    maxReleaseYear: number;
    languages: Array<any>;
    friends: Array<any>;
    recommandationTVIds: Array<any>;
    noTVReco: boolean;
    isMovie: boolean;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private movieRecommandation: MovieRecommandationService, private tvRecommandation: TVRecommandationService, private movieQuestionnaireService: MovieQuestionnaireService, private translate: TranslateService, private languagesService: LanguagesService, private socialService: SocialService) { }

    ngOnInit() {
        this.formWTW = {};
        this.formTVWTW = {};
        this.isMovie = true;
        this.maxReleaseYear = new Date().getFullYear();
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.showPlex = currentUser.plexServerId != undefined;
            this.formWTW.minRelease = currentUser.yearOfBirth ? currentUser.yearOfBirth : new Date().getFullYear() - 50;
            this.formWTW.maxRelease = new Date().getFullYear();
            this.formTVWTW.minRelease = currentUser.yearOfBirth ? currentUser.yearOfBirth : new Date().getFullYear() - 50;
            this.formTVWTW.maxRelease = new Date().getFullYear();
            this.movieDBService.getMovieDBConfiguration().subscribe(response => {
                this.configuration = response.json();
            },
                error => {
                    throw new Error(error);
                });
        }
        else {
            this.router.navigate(['']);
        }
        this.lang = currentUser.lang;
        this.formWTW.isRuntimeChecked = false;
        this.formTVWTW.isRuntimeChecked = false;
        this.socialService.getAllFriends().subscribe(response => {
            let allFriends = response.json();
            if (allFriends.length > 0) {
                this.socialService.getUserProfiles(_.map(allFriends, function (f) { return f.friendUserId; })).subscribe(response => {
                    this.friends = response.json().users;
                },
                    error => {
                        throw new Error(error);
                    });
            }
        },
            error => {
                throw new Error(error);
            });
        this.movieDBService.getAllGenres().subscribe(response => {
            this.genres = response.json();
            this.languagesService.getAll().subscribe(response => {
                this.languages = response.json().languages;
                this.movieRecommandation.getAll().subscribe(response => {
                    if (response.json().length > 0) {
                        this.recommandationIds = _.sample(_.map(response.json(), 'movieDBId'), 5);
                    }
                    else this.noReco = true;
                },
                    error => {
                        throw new Error(error);
                    });
                this.tvRecommandation.getAll().subscribe(response => {
                    if (response.json().length > 0) {
                        this.recommandationTVIds = _.sample(_.map(response.json(), 'movieDBId'), 5);
                    }
                    else this.noTVReco = true;
                },
                    error => {
                        throw new Error(error);
                    });
            },
                error => {
                    throw new Error(error);
                });
        },
            error => {
                throw new Error(error);
            });
        
    }

    onClickMovie(event) {
        this.isLoading = true;
        this.router.navigate(['/movie/' + event.movieId]);
    }

    onClickTV(event) {
        this.isLoading = true;
        this.router.navigate(['/tvshow/' + event.movieId]);
    }

    clickSearch() {
        if (this.formWTW.minRelease <= this.formWTW.maxRelease && this.formWTW.maxRelease <= new Date().getFullYear()) {
            this.isLoading = true;
            this.movieDBService.wtw(this.lang, this.formWTW.genreSelectValue, this.formWTW.isWatchlistChecked, this.formWTW.isRuntimeChecked, this.formWTW.runtimeLimit, this.formWTW.minRelease, this.formWTW.maxRelease, this.formWTW.isNowPlayingChecked, this.formWTW.countrySelectValue, this.formWTW.withFriend, this.formWTW.usePlex).subscribe(response => {
                // load existing data regarding this movie for the current user
                var id = response.json().id;
                if (id) this.router.navigate(['/movie/' + id]);
                else {
                    this.isLoading = false;
                    this.noResults = true;
                }
            },
                error => {
                    throw new Error(error);
                });
        }
        else {
            this.notValidReleaseDates = true;
        }
    }

    clickTVSearch() {
        if (this.formTVWTW.minRelease <= this.formTVWTW.maxRelease && this.formTVWTW.maxRelease <= new Date().getFullYear()) {
            this.isLoading = true;
            this.movieDBService.wtwTV(this.lang, this.formTVWTW.genreSelectValue, this.formTVWTW.isWatchlistChecked, this.formTVWTW.isRuntimeChecked, this.formTVWTW.runtimeLimit, this.formTVWTW.minRelease, this.formTVWTW.maxRelease, this.formTVWTW.countrySelectValue, this.formTVWTW.withFriend, this.formTVWTW.usePlex).subscribe(response => {
                // load existing data regarding this movie for the current user
                var id = response.json().id;
                if (id) this.router.navigate(['/tvshow/' + id]);
                else {
                    this.isLoading = false;
                    this.noTVResults = true;
                }
            },
                error => {
                    throw new Error(error);
                });
        }
        else {
            this.notValidTVReleaseDates = true;
        }
    }    
}