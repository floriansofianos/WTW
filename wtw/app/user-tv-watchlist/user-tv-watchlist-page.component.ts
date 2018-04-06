import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TVQuestionnaireService } from '../tv/tv-questionnaire.service';
import { MovieDBService } from '../movieDB/movieDB.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-tv-watchlist-page.component.html'
})

export class UserTVWatchlistPageComponent {
    leftMenus = [
        { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
        { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE' },
        { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST', selected: true }
    ];

    lang: string;
    configuration: any;
    movieIds: Array<number>;
    loadingState: boolean;
    tvQuestionnaireInit: any;
    selectedTVShow: any;
    showSaveSpinner: boolean;
    tvQuestionnaire: any;
    username: string;

    constructor(private authService: AuthService, private router: Router, private tvQuestionnaireService: TVQuestionnaireService, private movieDBService: MovieDBService) { }

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
            this.tvQuestionnaireService.getWatchlist().subscribe(data => {
                this.movieIds = _.map(data.json(), 'movieDBId');
                this.loadingState = false;
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
        this.router.navigate(['/tvshow/' + event.movieId]);
    }
}