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
    averageDistance: number;
    private sub: any;
    isPendingFriend: boolean;
    isFriend: boolean;
    friendship: any;

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
                    this.updateFriendStatus();
                }
                else this.router.navigate(['error']);
            },
                error => {
                    this.router.navigate(['error']);
                }
            );

            this.socialService.getUserDistance(this.id).subscribe(data => {
                if (data) {
                    this.updateDistance(data.json());
                }
                else this.router.navigate(['error']);
            },
                error => {
                    this.router.navigate(['error']);
                }
            );
        });
    }

    updateDistance(distance: any) {
        this.averageDistance = 100 - distance.averageDistance;
    }

    updateFriendStatus() {
        this.isLoading = true;
        this.socialService.getPendingFriend(this.id).subscribe(data => {
            if (data) {
                if (data.json().length > 0) {
                    this.isPendingFriend = true;
                    this.friendship = null;
                    this.isFriend = false;
                    this.isLoading = false;
                }
                else {
                    this.socialService.getFriend(this.id).subscribe(data => {
                        if (data) {
                            this.friendship = data.json();
                            this.isFriend = this.friendship != undefined;
                            this.isPendingFriend = false;
                            this.isLoading = false;
                        }
                        else this.router.navigate(['error']);
                    },
                        error => {
                            this.router.navigate(['error']);
                        })
                }
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    requestFriend() {
        this.isLoading = true;
        this.socialService.addToFriend(this.id).subscribe(data => {
            if (data) {
                this.updateFriendStatus();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    follow() {
        this.isLoading = true;
        this.socialService.followUser(this.id).subscribe(data => {
            if (data) {
                this.updateFriendStatus();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    unfollow() {
        this.isLoading = true;
        this.socialService.unfollowUser(this.id).subscribe(data => {
            if (data) {
                this.updateFriendStatus();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    unfriend() {
        this.isLoading = true;
        this.socialService.removeFromFriend(this.id).subscribe(data => {
            if (data) {
                this.updateFriendStatus();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    acceptFriendship() {
        this.isLoading = true;
        this.socialService.acceptFriend(this.id).subscribe(data => {
            if (data) {
                this.updateFriendStatus();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}