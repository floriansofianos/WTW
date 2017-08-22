import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    template: `
<h2>{{ 'HOME.HELLO' | translate }} {{ username }}</h2>
`
})

export class UserHomePageComponent {
    username: string

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
    }
}