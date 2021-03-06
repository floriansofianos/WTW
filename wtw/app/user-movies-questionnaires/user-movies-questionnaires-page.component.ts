﻿import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service';
import { MovieDBService } from '../movieDB/movieDB.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-movies-questionnaires-page.component.html'
})

export class UserMoviesQuestionnairesPageComponent {
    leftMenus = [
        { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
        { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE', selected: true },
        { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST' }
    ];
    startNewClicked: boolean;
    categories: Array<any>;
    categoriesNotLoaded: boolean
    configuration: any;
    lang: string;
    loadingState: boolean;
    movieQuestionnaireInit: any;
    selectedMovie: any;
    showSaveSpinner: boolean;
    movieQuestionnaire: any;
    username: string;

    constructor(private authService: AuthService, private router: Router, private movieQuestionnaireService: MovieQuestionnaireService, private movieDBService: MovieDBService) { }

    ngOnInit() {
        this.loadingState = false;
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
        this.lang = currentUser.lang;
        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.configuration = response.json();
            this.categoriesNotLoaded = true;
            this.movieQuestionnaireService.getAll().subscribe(data => {
                let movieQuestionnaires = _.filter(data.json(), (d) => { return (!d.isSkipped) && (d.isSeen || !d.wantToSee) });
                this.categories = [];
                for (let i = 1; i <= 5; i++) {
                    this.categories.push({
                        name: i.toString(), type: 'star', values: _.map(_.filter(movieQuestionnaires, (m) => { return m.isSeen && m.rating == i }), 'movieDBId')
                    });
                }
                this.categories.reverse();
                this.categories.push({
                    name: 'QUESTIONNAIRE.NOT_WANT_TO_SEE', type: 'text', values: _.map(_.filter(movieQuestionnaires, (m) => { return !m.isSeen && !m.wantToSee }), 'movieDBId')
                });
                this.categoriesNotLoaded = false;
            },
                error => {
                    throw new Error(error);
                }
            );
        },
            error => {
                throw new Error(error);
            });
    }

    onClickMovie(event) {
        this.router.navigate(['/movie/' + event.movieId]);
    }

    startNewQuestionnaire() {
        this.startNewClicked = true;
    }
}