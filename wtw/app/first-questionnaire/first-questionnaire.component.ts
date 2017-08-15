import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

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
    constructor(private authService: AuthService, private translate: TranslateService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser.age) this.age = currentUser.age;
        else this.age = 30;
    }

    states: string[] = ['active', null];
    age: number;

    setTranslation(lang: string) {
        this.translate.use(lang);
    }

    isTranslation(lang: string) {
        return this.translate.currentLang === lang;
    }

    langConfirm() {
        // Save data in DB
        this.authService.setUserProperty('lang', this.translate.currentLang).subscribe();
        this.setStateActive(1);
    }

    agePrevious() {
        this.setStateActive(0);
    }

    ageConfirm() {
        // Save data in DB
        if (this.age) this.authService.setUserProperty('age', this.age).subscribe();
        this.resetAllStates();
    }

    private setStateActive(i: number) {
        this.resetAllStates();
        this.states[i] = 'active';
    }

    resetAllStates() {
        this.states.forEach((o, i, a) => a[i] = null);
    }
}