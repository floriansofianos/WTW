import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MovieRecommandationService } from '../movie/movie-recommandation.service';
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
    movie: any;
    movieQuestionnaireInit: any;
    movieQuestionnaireInitLoaded: boolean;
    movieQuestionnaire: any;
    showSaveSpinner: boolean;
    isLoading: boolean;
    username: string;
    noResults: boolean;
    notValidReleaseDates: boolean;
    maxReleaseYear: number;
    languages: Array<any>;
    friends: Array<any>;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private movieRecommandation: MovieRecommandationService, private movieQuestionnaireService: MovieQuestionnaireService, private translate: TranslateService, private languagesService: LanguagesService, private socialService: SocialService) { }

    ngOnInit() {
        this.formWTW = {};
        this.maxReleaseYear = new Date().getFullYear();
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.formWTW.minRelease = currentUser.yearOfBirth ? currentUser.yearOfBirth : new Date().getFullYear() - 50;
            this.formWTW.maxRelease = new Date().getFullYear();
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
        this.socialService.getAllFriends().subscribe(response => {
            let allFriends = response.json();
            if (allFriends.length > 0) {
                this.socialService.getUserProfiles(_.map(allFriends, function (f) { return f.friendUserId; })).subscribe(response => {
                    this.friends = response.json().users;
                },
                    error => {
                        this.router.navigate(['error']);
                    });
            }
        },
            error => {
                this.router.navigate(['error']);
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
                        this.router.navigate(['error']);
                    });
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
        this.router.navigate(['/movie/' + event.movieId]);
    }

    

    clickSearch() {
        if (this.formWTW.minRelease <= this.formWTW.maxRelease && this.formWTW.maxRelease <= new Date().getFullYear()) {
            this.isLoading = true;
            this.movieDBService.wtw(this.lang, this.formWTW.genreSelectValue, this.formWTW.isWatchlistChecked, this.formWTW.isRuntimeChecked, this.formWTW.runtimeLimit, this.formWTW.minRelease, this.formWTW.maxRelease, this.formWTW.isNowPlayingChecked, this.formWTW.countrySelectValue).subscribe(response => {
                // load existing data regarding this movie for the current user
                var id = response.json().id;
                if (id) this.router.navigate(['/movie/' + id]);
                else {
                    this.isLoading = false;
                    this.noResults = true;
                }
            },
                error => {
                    this.router.navigate(['error']);
                });
        }
        else {
            this.notValidReleaseDates = true;
        }
    }    
}