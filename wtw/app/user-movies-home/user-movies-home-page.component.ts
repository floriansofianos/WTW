﻿import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MatInputModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service';

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
    showSaveSpinner = false;
    username: string;
    lang: string;
    leftMenus = [
        { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME', selected: true },
        { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE' },
        { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST' }
    ];

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private translate: TranslateService, private movieQuestionnaireService: MovieQuestionnaireService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.lang = currentUser.lang;
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
    }

    searchMovie() {
        if (this.search && this.search.trim()) {
            this.searchContainerState = 'searched';
            this.loadingSearch = true;
            this.searchResultsLoaded = 'notLoaded'
            this.movieDBService.search(this.search, this.lang).subscribe(
                data => {
                    this.searchResults = data.json();
                    if (this.searchResults.length < 1) {

                    }
                    this.loadingSearch = false;
                    this.searchResultsLoaded = 'loaded'
                },
                error => {
                    this.router.navigate(['/error']);
                }
            );
        }
    }

    rateMovie(id) {
        this.router.navigate(['/movie/' + id]);
    }


    keyDownFunction(event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.searchMovie();
        }
    }
}