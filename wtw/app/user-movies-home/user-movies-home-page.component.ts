import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MdInputModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
    moduleId: module.id,
    templateUrl: 'user-movies-home-page.component.html',
    animations: [
        trigger('searchState', [
            state('notSearched', style({
                transform: 'translateY(150px)'
            })),
            transition('notSearched => searched', animate('800ms ease-in')),
            state('searched', style({
                transform: 'translateY(0px)'
            }))
        ]),
        trigger('searchResultsState', [
            state('notSearched', style({
                opacity: 0
            })),
            transition('notSearched => searched', animate('300ms 200ms ease-in')),
            state('searched', style({
                opacity: 1
            }))
        ]),
        trigger('searchResultsLoadedState', [
            state('notLoaded', style({
                opacity: 0
            })),
            transition('notLoaded <=> loaded', animate('200ms ease-in')),
            state('loaded', style({
                opacity: 1
            }))
        ]),
    ]
})

export class UserMoviesHomePageComponent {
    search: string;
    configuration: any;
    searchResults: Array<any>;
    movie: any;
    movieQuestionnaireInit: any;
    movieQuestionnaireInitLoaded: boolean;
    movieQuestionnaire: any;
    hideSearch: boolean = false;
    searchContainerState = 'notSearched';
    loadingSearch = false;
    searchResultsLoaded = 'notLoaded';

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private translate: TranslateService) { }

    ngOnInit() {
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
    }

    searchMovie() {
        this.searchContainerState = 'searched';
        this.loadingSearch = true;
        this.searchResultsLoaded = 'notLoaded'
        this.movieDBService.search(this.search).subscribe(
            data => {
                this.searchResults = data.json();
                this.loadingSearch = false;
                this.searchResultsLoaded = 'loaded'
            },
            error => {
                this.router.navigate(['/error']);
            }
        );
    }

    rateMovie(id) {
        this.movieDBService.getMovie(id, this.translate.currentLang).subscribe(
            data => {
                this.movie = data.json();
                this.movieQuestionnaireInitLoaded = true;
                this.hideSearch = true;
            },
            error => {
                this.router.navigate(['/error']);
            }
        );
    }

    back() {
        this.movieQuestionnaireInitLoaded = false;
        this.hideSearch = false;
    }

    confirm() {
        // Add the questionnaire to DB
    }

    movieQuestionnaireChange(data) {
        this.movieQuestionnaire = data;
    }
}