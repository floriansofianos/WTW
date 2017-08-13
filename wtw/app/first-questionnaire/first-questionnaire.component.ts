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

    states: string[] = ['active', null];

    setTranslation(lang: string) {
        this.translate.use(lang);
    }

    langConfirm() {
        this.resetAllStates();
        this.states[1] = 'active';
    }

    agePrevious() {
        this.resetAllStates();
        this.states[0] = 'active';
    }

    ageConfirm() {
        this.resetAllStates();
    }

    resetAllStates() {
        this.states[0] = null;
        this.states[1] = null;
    }
}