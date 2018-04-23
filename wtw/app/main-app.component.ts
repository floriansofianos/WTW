import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'main-app',
    template: `
<router-outlet></router-outlet>
`
})

export class MainAppComponent {
    constructor(private translate: TranslateService, private authService: AuthService, private deviceService: DeviceDetectorService) {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) translate.use(currentUser.lang);
        else {
            let browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
        this.checkDeviceAndRedirect();
    }

    checkDeviceAndRedirect() {
        if (this.deviceService.isMobile() || this.deviceService.isTablet()) window.location.href = 'https://mobile.whatowatch.net';
    }
}