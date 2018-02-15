import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SocialService } from './social.service';

@Component({
    moduleId: module.id,
    templateUrl: 'social-page.component.html'
})

export class SocialPageComponent {
    username: string;
    search: string;
    isLoading: boolean;
    noResults: boolean;
    usersThatAlsoLiked: any;
    currentUser: any;

    constructor(private authService: AuthService, private router: Router, private socialService: SocialService) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            if (!this.currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = this.currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
    }

    clickSearch() {
        this.isLoading = true;
        this.socialService.search(this.search).subscribe(data => {
            if (data) {
                data = data.json();
                if (data.success != undefined) {
                    this.isLoading = false;
                    this.noResults = true;
                }
                else this.router.navigate(['/user/' + data.id]);
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            }
        );
    }

    keyDownFunction(event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.clickSearch();
        }
    }
}