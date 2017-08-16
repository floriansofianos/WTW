import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { FirstQuestionnaireService } from '../first-questionnaire/first-questionnaire.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
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
    constructor(private authService: AuthService, private translate: TranslateService, private router: Router, private firstQuestionnaireService: FirstQuestionnaireService) { }

    movie: any;
    configuration: any;

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser.age) this.age = currentUser.age;
        else this.age = 30;
    }

    states: string[] = ['active', null, null];
    age: number;
    showSpinner: boolean;

    setTranslation(lang: string) {
        this.translate.use(lang);
    }

    isTranslation(lang: string) {
        return this.translate.currentLang === lang;
    }

    langSkip() {
        this.setStateActive(1);
    }

    ageSkip() {
        this.resetAllStates();
    }

    langConfirm() {
        this.showSpinner = true;
        // Save data in DB
        this.authService.setUserProperty('lang', this.translate.currentLang).subscribe(response => {
            this.setStateActive(1);
            this.showSpinner = false;
        },
        error => {
            this.router.navigate(['error']);
        });
    }

    agePrevious() {
        this.setStateActive(0);
    }

    ageConfirm() {
        this.showSpinner = true;
        // Save data in DB
        if (this.age) this.authService.setUserProperty('age', this.age).subscribe(response => {
            this.firstQuestionnaireService.getMovieDBConfiguration().subscribe(response => {
                this.configuration = response.json();
                this.firstQuestionnaireService.getFirstQuestionnaireMovie(this.translate.currentLang).subscribe(response => {
                    this.movie = response.json();
                    this.setStateActive(2);
                    this.showSpinner = false;
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

    private setStateActive(i: number) {
        this.resetAllStates();
        this.states[i] = 'active';
    }

    resetAllStates() {
        this.states.forEach((o, i, a) => a[i] = null);
    }
}