import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service';
import { MovieDBService } from '../movieDB/movieDB.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-movies-watchlist-page.component.html'
})

export class UserMoviesWatchlistPageComponent {
    leftMenus = [
        { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
        { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE' },
        { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST', selected: true }
    ];

    lang: string;
    configuration: any;
    movieIds: Array<number>;
    loadingState: boolean;
    movieQuestionnaireInit: any;
    selectedMovie: any;
    showSaveSpinner: boolean;
    movieQuestionnaire: any;
    username: string;

    constructor(private authService: AuthService, private router: Router, private movieQuestionnaireService: MovieQuestionnaireService, private movieDBService: MovieDBService) { }

    ngOnInit() {
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
        this.loadingState = true;
        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.configuration = response.json();
            this.movieQuestionnaireService.getWatchlist().subscribe(data => {
                this.movieIds = _.map(data.json(), 'movieDBId');
                this.loadingState = false;
            },
                error => {
                    this.router.navigate(['error']);
                }
            );
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    onClickMovie(event) {
        this.router.navigate(['/movie/' + event.movieId]);
    }
}