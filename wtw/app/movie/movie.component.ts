import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { MovieQuestionnaireService } from './movie-questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'movie.component.html'
})

export class MoviePageComponent {
    movieId: number;
    username: string;
    configuration: any;
    private sub: any;
    lang: string;
    id: number;
    movieQuestionnaireInit: any;
    movieQuestionnaire: any;
    movie: any;
    isLoading: boolean;
    showSaveSpinner: boolean;
    availableOnPlex: boolean;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private route: ActivatedRoute, private movieQuestionnaireService: MovieQuestionnaireService, private location: Location) { }

    ngOnInit() {
        this.isLoading = true;
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.lang = currentUser.lang;
        }
        else {
            this.router.navigate(['']);
        }

        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.configuration = response.json();
            // Load the asked user profile
            this.sub = this.route.params.subscribe(params => {
                this.id = +params['id']; // (+) converts string 'id' to a number

                // Plex integartion
                this.movieDBService.availableOnPlex(this.id).subscribe(response => {
                    this.availableOnPlex = response.json().available;
                },
                error => {
                    this.router.navigate(['/error']);
                });

                // load existing data regarding this movie for the current user
                this.movieQuestionnaireService.get(this.id).subscribe(
                    data => {
                        this.movieQuestionnaireInit = data.json();
                        this.movieDBService.getMovie(this.id, this.lang).subscribe(
                            data => {
                                this.movie = data.json();
                                this.isLoading = false;
                            },
                            error => {
                                this.router.navigate(['/error']);
                            }
                        );
                    },
                    error => {
                        this.router.navigate(['/error']);
                    }
                );
            });
        });
    }

    movieQuestionnaireChange(data) {
        this.movieQuestionnaire = data;
    }

    movieQuestionnaireSave(event) {
        this.confirm();
    }

    confirm() {
        // Add the questionnaire to DB
        this.showSaveSpinner = true;
        // Save data in DB
        if (this.movieQuestionnaire) this.movieQuestionnaireService.create(this.movieQuestionnaire).subscribe(response => {
            this.showSaveSpinner = false;
            this.back();
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    back() {
        this.location.back();
    }
}