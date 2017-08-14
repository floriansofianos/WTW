﻿import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'main-app',
    template: `
<router-outlet></router-outlet>
`
})

export class MainAppComponent {
    constructor(private translate: TranslateService, private authService: AuthService) {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) translate.use(currentUser.lang);
        else {
            let browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
    }
}