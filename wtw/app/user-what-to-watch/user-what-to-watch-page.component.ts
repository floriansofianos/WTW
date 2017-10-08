import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MovieRecommandationService } from '../movie/movie-recommandation.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    templateUrl: 'user-what-to-watch-page.component.html',
})

export class UserWhatToWatchPageComponent {
    configuration: any;
    lang: string;
    recommandationIds: Array<any>;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private movieRecommandation: MovieRecommandationService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.movieDBService.getMovieDBConfiguration().subscribe(response => {
                this.configuration = response.json();
            },
                error => {
                    this.router.navigate(['error']);
                });
        }
        else {
            this.router.navigate(['']);
        }
        this.lang = currentUser.lang;
        this.movieRecommandation.getAll().subscribe(response => {
            this.recommandationIds = _.map(response.json(), 'movieDBId');
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    onClickMovie(event) {

    }

    
}