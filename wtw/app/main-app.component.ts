import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'main-app',
    template: `
<router-outlet></router-outlet>
`
})

export class MainAppComponent {
    constructor(private translate: TranslateService) {
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
}