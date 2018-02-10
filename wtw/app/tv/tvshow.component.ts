import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MovieDBService } from '../movieDB/movieDB.service';
import { TVQuestionnaireService } from './tv-questionnaire.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: 'tvshow.component.html'
})

export class TVShowPageComponent {
    movieId: number;
    username: string;
    configuration: any;
    private sub: any;
    lang: string;
    id: number;
    tvQuestionnaireInit: any;
    tvQuestionnaire: any;
    tvshow: any;
    isLoading: boolean;
    showSaveSpinner: boolean;
    availableOnPlex: boolean;

    constructor(private authService: AuthService, private router: Router, private movieDBService: MovieDBService, private route: ActivatedRoute, private tvQuestionnaireService: TVQuestionnaireService, private location: Location) { }

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
                if (currentUser.plexServerId) {
                    this.movieDBService.tvAvailableOnPlex(this.id).subscribe(response => {
                        this.availableOnPlex = response.json().available;
                    },
                        error => {
                            this.router.navigate(['/error']);
                        });
                }

                // load existing data regarding this movie for the current user
                this.tvQuestionnaireService.get(this.id).subscribe(
                    data => {
                        this.tvQuestionnaireInit = data.json();
                        this.movieDBService.getTV(this.id, this.lang).subscribe(
                            data => {
                                this.tvshow = data.json();
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

    tvQuestionnaireChange(data) {
        this.movieQuestionnaire = data;
    }

    tvQuestionnaireSave(event) {
        this.confirm();
    }

    confirm() {
        // Add the questionnaire to DB
        this.showSaveSpinner = true;
        // Save data in DB
        if (this.tvQuestionnaire) this.tvQuestionnaireService.create(this.tvQuestionnaire).subscribe(response => {
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