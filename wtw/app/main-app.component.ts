import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'main-app',
    template: `
<h2>Hello World From Angular 2</h2>
<h3>{{ 'HOME.TITLE' | translate }}</h3>
<div>{{ testVariable }}</div>
`
})

export class MainAppComponent {
    testVariable = 'Test Var';

    constructor(private translate: TranslateService) {
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
}