import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-profile-page.component.html'
})

export class UserProfilePageComponent {
    username: string;
    isLoading: boolean;
    user: any;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.isLoading = true;
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.user = currentUser;
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