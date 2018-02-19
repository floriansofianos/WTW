import { Component, Input } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TVQuestionnaireService } from '../tv/tv-questionnaire.service';
import { UserTVQuestionnaireService } from './user-tv-questionnaire.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { MovieDBService } from '../movieDB/movieDB.service';
import { CountriesService } from '../countries/countries.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'tv-questionnaire',
    templateUrl: 'tv-questionnaire.component.html',
    animations: [
        trigger('areaState', [
            state('active', style({
                opacity: 1,
                transform: 'translateX(-50%)'
            })),
            transition('void => *',
                [
                    style({
                        transform: 'translateX(-150%)',
                        opacity: 0
                    }),
                    animate('100ms 300ms ease-in')
                ]
            ),
            transition('* => void',
                [
                    animate(300, keyframes([
                        style({ opacity: 1, transform: 'translateX(-50%)', offset: 0 }),
                        style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                        style({ opacity: 0, transform: 'translateX(150%)', offset: 1.0 })
                    ]))
                ]
            )
        ])
    ]
})

export class TVQuestionnaireComponent {
    constructor(private authService: AuthService, private translate: TranslateService, private router: Router, private tvQuestionnaireService: TVQuestionnaireService, private movieDBService: MovieDBService, private userTVQuestionnaireService: UserTVQuestionnaireService, private countriesService: CountriesService) { }
    tvshow: any;
    configuration: any;
    tvQuestionnaire: any
    tvIndex: number
    questionAnswered: number
    questionsToAnswer: number;
    previousTVShows: any = [];
    tvQuestionnaireInit: any;
    username: string;
    lang: string;
    yearOfBirth: number;
    countriesList: any;
    selectedCountry: any;

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser.yearOfBirth) this.yearOfBirth = currentUser.yearOfBirth;
        else this.yearOfBirth = 1980;
        if (currentUser.country) this.selectedCountry = currentUser.country;
        this.questionsToAnswer = 10;
        this.username = currentUser.username;
        this.tvIndex = -1;
        this.questionAnswered = 0;
        this.lang = this.translate.currentLang;
        this.showSpinner = true;
        this.getNextAgeStep();
    }

    states: string[] = ['active', null, null];
    age: number;
    showSpinner: boolean;

    getNextAgeStep() {
        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.configuration = response.json();
            this.questionAnswered++;
            this.showNextTVShow();
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    tvQuestionnaireChange(data) {
        if (data.skipTV) {
            this.tvSkip();
        }
        else this.tvQuestionnaire = data;
    }

    tvPrevious() {
        this.showSpinner = true;
        this.tvIndex--;
        if (this.tvIndex < 0) {
            this.questionAnswered--;
            this.setStateActive(1);
        }
        else {
            this.tvshow = this.previousTVShows[this.tvIndex].tvshow;
            this.tvQuestionnaireInit = this.previousTVShows[this.tvIndex].tvQuestionnaire;
            if (!this.tvQuestionnaireInit.isSkipped) this.questionAnswered--;
        }
        this.showSpinner = false;
    }

    showNextTVShow() {
        if (this.previousTVShows && this.previousTVShows[this.tvIndex + 1]) {
            this.tvIndex++;
            this.tvshow = this.previousTVShows[this.tvIndex].tvshow;
            this.tvQuestionnaireInit = this.previousTVShows[this.tvIndex].tvQuestionnaire;
            this.showSpinner = false;
            if (this.tvIndex === 0) this.setStateActive(2);
        }
        else {
            this.getTVQuestionnaireFromUserQuestionnaire();           
        }
    }

    getTVQuestionnaireFromUserQuestionnaire() {
        this.userTVQuestionnaireService.get(this.translate.currentLang).subscribe(response => {
            if (response.json().reload) {
                this.getTVQuestionnaireFromUserQuestionnaire();
            }
            else this.showTVShowFromAPIResponse(response);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    showTVShowFromAPIResponse(response) {
        this.tvshow = response.json();
        this.tvIndex++;
        this.showSpinner = false;
        if (this.tvIndex === 0) this.setStateActive(2);
        this.storePreviousTVShow(true);
    }

    tvSkip() {
        this.showSpinner = true;
        this.tvQuestionnaire.isSkipped = true;
        this.storePreviousTVShow(false);
        // Save data in DB
        if (this.tvQuestionnaire) this.tvQuestionnaireService.create(this.tvQuestionnaire).subscribe(response => {
            this.showNextTVShow();
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    storePreviousTVShow(isFirstSave: boolean) {
        if (this.previousTVShows[this.tvIndex]) {
            this.previousTVShows[this.tvIndex] = {
                tvshow: this.tvshow,
                tvQuestionnaire: this.tvQuestionnaire
            }
        }
        else this.previousTVShows.push({
            tvshow: this.tvshow,
            tvQuestionnaire: isFirstSave ? null : this.tvQuestionnaire
        });
    }

    tvConfirm() {
        this.showSpinner = true;
        this.storePreviousTVShow(false);
        // Save data in DB
        if (this.tvQuestionnaire) this.tvQuestionnaireService.create(this.tvQuestionnaire).subscribe(response => {
            this.questionAnswered++;
            // Check if we need to show more movies
            if (this.questionAnswered >= this.questionsToAnswer) {
                
            }
            else {
                this.showNextTVShow();
            }
        },
        error => {
            this.router.navigate(['error']);
        });

    }

    private setStateActive(i: number) {
        this.resetAllStates();
        this.states[i] = 'active';
    }

    resetAllStates() {
        this.states.forEach((o, i, a) => a[i] = null);
    }
}