import { Component, Input } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FirstQuestionnaireService } from '../first-questionnaire/first-questionnaire.service';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service';
import { UserQuestionnaireService } from './user-questionnaire.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { MovieDBService } from '../movieDB/movieDB.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'first-questionnaire',
    templateUrl: 'first-questionnaire.component.html',
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

export class FirstQuestionnaireComponent {
    constructor(private authService: AuthService, private translate: TranslateService, private router: Router, private firstQuestionnaireService: FirstQuestionnaireService, private movieQuestionnaireService: MovieQuestionnaireService, private movieDBService: MovieDBService, private userQuestionnaireService: UserQuestionnaireService) { }
    @Input() isFirstQuestionnaire: boolean;
    movie: any;
    configuration: any;
    movieQuestionnaire: any
    movieIndex: number
    questionAnswered: number
    questionsToAnswer: number;
    previousMovies: any = [];
    movieQuestionnaireInit: any;
    welcomeMessage: boolean;
    username: string;

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser.age) this.age = currentUser.age;
        else this.age = 30;
        this.questionsToAnswer = this.isFirstQuestionnaire ? 12 : 10;
        this.username = currentUser.username;
        this.welcomeMessage = true;
        this.movieIndex = -1;
        this.questionAnswered = 0;
        if (currentUser.firstQuestionnaireCompleted && this.isFirstQuestionnaire) {
            this.questionAnswered = this.questionsToAnswer;
            this.setStateActive(2);
        }
        if (!this.isFirstQuestionnaire) {
            this.showSpinner = true;
            this.getNextAgeStep();
        }
    }

    states: string[] = ['active', null, null];
    age: number;
    showSpinner: boolean;

    welcomeMessageOK() {
        this.welcomeMessage = false;
    }

    setTranslation(lang: string) {
        this.translate.use(lang);
    }

    isTranslation(lang: string) {
        return this.translate.currentLang === lang;
    }

    langSkip() {
        this.setStateActive(1);
        this.questionAnswered++;
    }

    ageSkip() {
        this.showSpinner = true;
        this.getNextAgeStep();
    }

    langConfirm() {
        this.showSpinner = true;
        // Save data in DB
        this.authService.setUserProperty('lang', this.translate.currentLang).subscribe(response => {
            this.setStateActive(1);
            this.showSpinner = false;
            this.questionAnswered++;
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    agePrevious() {
        this.setStateActive(0);
        this.questionAnswered--;
    }

    ageConfirm() {
        this.showSpinner = true;
        // Save data in DB
        if (this.age) this.authService.setUserProperty('age', this.age).subscribe(response => {
            this.getNextAgeStep();
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    getNextAgeStep() {
        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.configuration = response.json();
            this.questionAnswered++;
            this.showNextMovie();
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    movieQuestionnaireChange(data) {
        this.movieQuestionnaire = data;
    }

    moviePrevious() {
        this.showSpinner = true;
        this.movieIndex--;
        if (this.movieIndex < 0) {
            this.questionAnswered--;
            this.setStateActive(1);
        }
        else {
            this.movie = this.previousMovies[this.movieIndex].movie;
            this.movieQuestionnaireInit = this.previousMovies[this.movieIndex].movieQuestionnaire;
            if (!this.movieQuestionnaireInit.isSkipped) this.questionAnswered--;
        }
        this.showSpinner = false;
    }

    showNextMovie() {
        if (this.previousMovies && this.previousMovies[this.movieIndex + 1]) {
            this.movieIndex++;
            this.movie = this.previousMovies[this.movieIndex].movie;
            this.movieQuestionnaireInit = this.previousMovies[this.movieIndex].movieQuestionnaire;
            this.showSpinner = false;
            if (this.movieIndex === 0) this.setStateActive(2);
        }
        else {
            if (this.isFirstQuestionnaire) {
                this.firstQuestionnaireService.getFirstQuestionnaireMovie(this.translate.currentLang).subscribe(response => {
                    this.showMovieFromAPIResponse(response);
                },
                    error => {
                        this.router.navigate(['error']);
                    });
            }
            else {
                this.userQuestionnaireService.get(this.translate.currentLang).subscribe(response => {
                    this.showMovieFromAPIResponse(response);
                },
                    error => {
                        this.router.navigate(['error']);
                    });
            }            
        }
    }

    showMovieFromAPIResponse(response) {
        this.movie = response.json();
        this.movieIndex++;
        this.showSpinner = false;
        if (this.movieIndex === 0) this.setStateActive(2);
        this.storePreviousMovie(true);
    }

    movieSkip() {
        this.showSpinner = true;
        this.movieQuestionnaire.isSkipped = true;
        this.storePreviousMovie(false);
        // Save data in DB
        if (this.movieQuestionnaire) this.movieQuestionnaireService.create(this.movieQuestionnaire).subscribe(response => {
            this.showNextMovie();
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    storePreviousMovie(isFirstSave: boolean) {
        if (this.previousMovies[this.movieIndex]) {
            this.previousMovies[this.movieIndex] = {
                movie: this.movie,
                movieQuestionnaire: this.movieQuestionnaire
            }
        }
        else this.previousMovies.push({
            movie: this.movie,
            movieQuestionnaire: isFirstSave ? null : this.movieQuestionnaire
        });
    }

    movieConfirm() {
        this.showSpinner = true;
        this.storePreviousMovie(false);
        // Save data in DB
        if (this.movieQuestionnaire) this.movieQuestionnaireService.create(this.movieQuestionnaire).subscribe(response => {
            this.questionAnswered++;
            // Check if we need to show more movies
            if (this.questionAnswered >= this.questionsToAnswer) {
                if (this.isFirstQuestionnaire) {
                    this.authService.setUserProperty('firstQuestionnaireCompleted', true).subscribe(response => {
                        this.showSpinner = false;
                    },
                        error => {
                            this.router.navigate(['error']);
                        });
                }
                else {

                }
            }
            else {
                this.showNextMovie();
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