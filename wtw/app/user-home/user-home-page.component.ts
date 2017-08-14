import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';

@Component({
    template: `
<h2>{{ 'HOME.WELCOME' | translate }} {{ username }}</h2>
<first-questionnaire></first-questionnaire>
`
})

export class UserHomePageComponent {
    username: string

    constructor(private authService: AuthService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) this.username = currentUser.username;
    }
}