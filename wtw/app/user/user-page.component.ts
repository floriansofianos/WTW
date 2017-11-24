import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SocialService } from '../social/social.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'user-page.component.html'
})

export class UserPageComponent {
    id: number;
    username: string;
    isLoading: boolean;
    user: any;
    private sub: any;

    constructor(private authService: AuthService, private router: Router, private socialService: SocialService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.isLoading = true;
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
        // Load the asked user profile
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number

            this.socialService.getUserProfile(this.id).subscribe(data => {
                if (data) {
                    this.user = data.json();
                    this.socialService.getPendingFriend(this.id).subscribe(data => {
                        if (data) {
                            this.isLoading = false;
                        }
                        else this.router.navigate(['error']);
                    },
                        error => {
                            this.router.navigate(['error']);
                        });

                }
                else this.router.navigate(['error']);
            },
                error => {
                    this.router.navigate(['error']);
                }
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}