import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    template: `
<top-menu [showButtons]="false" [showLogin]="false"></top-menu>
<div class="content-container-welcome">
<questionnaire [isFirstQuestionnaire]="true"></questionnaire>
</div>
<footer></footer>
`
})

export class UserWelcomePageComponent {
    username: string

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) this.username = currentUser.username;
        else this.router.navigate(['login']);
    }
}