import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { TimelineService } from '../timeline/timeline.service';
import { UserService } from '../user/user.service';
import { MovieDBService } from '../movieDB/movieDB.service';

@Component({
    moduleId: module.id,
    templateUrl: 'user-home-page.component.html'
})

export class UserHomePageComponent {
    username: string;
    timelineEvents: Array<any>;
    allFriends: Array<any>;
    currentUserId: number;
    lang: string;
    config: any;

    constructor(private authService: AuthService, private router: Router, private timelineService: TimelineService, private userService: UserService, private movieDBService: MovieDBService) { }

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
        this.currentUserId = currentUser.id;
        this.lang = currentUser.lang;
        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.config = response.json();
            this.userService.getAllFriends().subscribe(response => {
                this.allFriends = response.json();
                this.timelineService.get(0).subscribe(response => {
                    this.timelineEvents = response.json();
                },
                    error => {
                        this.router.navigate(['error']);
                    });
            },
                error => {
                    this.router.navigate(['error']);
                });
        },
            error => {
                this.router.navigate(['error']);
            });
        
    }
}