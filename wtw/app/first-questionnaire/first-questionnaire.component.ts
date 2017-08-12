import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'first-questionnaire',
    templateUrl: 'first-questionnaire.component.html',
    animations: [
        trigger('areaState', [
            state('active', style({
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({ transform: 'translateX(-100%)' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200, style({ transform: 'translateX(100%)' }))
            ])
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