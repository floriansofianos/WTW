import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'first-questionnaire',
    templateUrl: 'first-questionnaire.component.html'
})

export class FirstQuestionnaireComponent {
    constructor(private authService: AuthService, private translate: TranslateService) { }

    ngOnInit() {

    }

    setTranslation(lang: string) {
        this.translate.use(lang);
    }
}