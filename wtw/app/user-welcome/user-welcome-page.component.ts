import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';

@Component({
    template: `
<first-questionnaire></first-questionnaire>
`
})

export class UserWelcomePageComponent {
    username: string

    constructor(private authService: AuthService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) this.username = currentUser.username;
    }
}