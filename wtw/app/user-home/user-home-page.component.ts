import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TimelineService } from '../timeline/timeline.service';


@Component({
    moduleId: module.id,
    templateUrl: 'user-home-page.component.html'
})

export class UserHomePageComponent {
    username: string;

    constructor(private authService: AuthService, private router: Router, private timelineService: TimelineService) { }

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
        this.timelineService.get(0).subscribe(response => {
            console.log(response.json());
        },
            error => {
                this.router.navigate(['error']);
            });
    }
}