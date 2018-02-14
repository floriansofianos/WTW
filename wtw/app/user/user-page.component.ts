import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { SocialService } from '../social/social.service';
import { ActivatedRoute } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { UserService } from '../user/user.service';
import { CountriesService } from '../countries/countries.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-page.component.html'
})

export class UserPageComponent {
    id: number;
    currentUserId: number;
    username: string;
    isLoading: boolean;
    user: any;
    averageDistance: number;
    private sub: any;
    isPendingFriend: boolean;
    isFriend: boolean;
    friendship: any;
    isCurrentUser: boolean;
    likeMovieIds: Array<any>;
    dislikeMovieIds: Array<any>;
    likeTVShowIds: Array<any>;
    dislikeTVShowIds: Array<any>;
    config: any;
    lang: string;
    userCountry: string;
    photoData: any;
    isPendingFriendForMe: boolean;

    constructor(private authService: AuthService, private router: Router, private socialService: SocialService, private route: ActivatedRoute, private movieDBService: MovieDBService, private userService: UserService, private countriesService: CountriesService) { }

    ngOnInit() {
        this.isLoading = true;
        let currentUser = this.authService.getCurrentUser();
        this.currentUserId = currentUser.id;
        if (currentUser) {
            this.lang = currentUser.lang;
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }

        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.config = response.json();
            // Load the asked user profile
            this.sub = this.route.params.subscribe(params => {
                this.id = +params['id']; // (+) converts string 'id' to a number
                this.isCurrentUser = this.currentUserId == this.id;
                this.socialService.getUserProfile(this.id).subscribe(data => {
                    if (data) {
                        var response = data.json();
                        this.user = response.user;
                        this.likeMovieIds = _.map(_.filter(response.questionnaires, function (q) { return q.rating >= 4; }), 'movieDBId');
                        this.dislikeMovieIds = _.map(_.filter(response.questionnaires, function (q) { return q.rating < 4; }), 'movieDBId');
                        this.likeTVShowIds = _.map(_.filter(response.tvQuestionnaires, function (q) { return q.rating >= 4; }), 'movieDBId');
                        this.dislikeTVShowIds = _.map(_.filter(response.tvQuestionnaires, function (q) { return q.rating < 4; }), 'movieDBId');
                        this.countriesService.getAll().subscribe(response => {
                            let countriesList = response.json().countries;
                            let profileUser = this.user;
                            this.userCountry = _.find(countriesList, function (c) { return c.code == profileUser.country; });
                            this.updateFriendStatus();
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
                if (!this.isCurrentUser) {
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
                }
            });
        },
            error => {
                this.router.navigate(['error']);
            });

    }

    updatePhoto() {
        this.userService.getAvatar(this.user.id, 'big').subscribe(res => {
            var data = res.json();
            if (data && data.success) {
                this.photoData = data.data;
            }
            else this.photoData = null;
            this.isLoading = false;
        },
            error => {
                this.router.navigate(['error']);
            }
        );
    }

    updateDistance(distance: any) {
        this.averageDistance = 100 - distance.averageDistance;
    }

    updateFriendStatus() {
        this.isLoading = true;
        this.socialService.getPendingFriend(this.id).subscribe(data => {
            if (data) {
                if (data.json().length > 0) {
                    let pendingFriendships = data.json();
                    let currentUserId = this.currentUserId;
                    if (_.find(pendingFriendships, function (p) { return p.toUserId == currentUserId; })) this.isPendingFriendForMe = true;
                    this.isPendingFriend = true;
                    this.friendship = null;
                    this.isFriend = false;
                    this.updatePhoto();
                }
                else {
                    this.socialService.getFriend(this.id).subscribe(data => {
                        if (data) {
                            this.friendship = data.json();
                            this.isFriend = this.friendship != undefined;
                            this.isPendingFriend = false;
                            this.isPendingFriendForMe = false;
                            this.updatePhoto();
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
        this.socialService.acceptFriend(this.id, null).subscribe(data => {
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

    onClickMovie(event) {
        this.router.navigate(['/movie/' + event.movieId])
    }

    onClickTV(event) {
        this.router.navigate(['/tvshow/' + event.movieId])
    }
}