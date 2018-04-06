import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TVQuestionnaireService } from '../tv/tv-questionnaire.service';
import { MovieDBService } from '../movieDB/movieDB.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-tv-questionnaires-page.component.html'
})

export class UserTVQuestionnairesPageComponent {
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
    tvQuestionnaireInit: any;
    selectedTV: any;
    showSaveSpinner: boolean;
    tvQuestionnaire: any;
    username: string;

    constructor(private authService: AuthService, private router: Router, private tvQuestionnaireService: TVQuestionnaireService, private movieDBService: MovieDBService) { }

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
            this.tvQuestionnaireService.getAll().subscribe(data => {
                let tvQuestionnaires = _.filter(data.json(), (d) => { return (!d.isSkipped) && (d.isSeen || !d.wantToSee) });
                this.categories = [];
                for (let i = 1; i <= 5; i++) {
                    this.categories.push({
                        name: i.toString(), type: 'star', values: _.map(_.filter(tvQuestionnaires, (m) => { return m.isSeen && m.rating == i }), 'movieDBId')
                    });
                }
                this.categories.reverse();
                this.categories.push({
                    name: 'QUESTIONNAIRE.NOT_WANT_TO_SEE', type: 'text', values: _.map(_.filter(tvQuestionnaires, (m) => { return !m.isSeen && !m.wantToSee }), 'movieDBId')
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
        this.router.navigate(['/tvshow/' + event.movieId]);
    }

    startNewQuestionnaire() {
        this.startNewClicked = true;
    }
}