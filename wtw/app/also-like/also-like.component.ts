import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SocialService } from '../social/social.service';
import { MovieDBService } from '../movieDB/movieDB.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'also-like',
    templateUrl: 'also-like.component.html'
})

export class AlsoLikeComponent {
    @Input() lang: string;
    numberOfElements = 60;
    loadedElements = 0;
    movies: Array<any> = [];
    isLoading: boolean = true;
    config: any;
    width: 50;

    constructor(private router: Router, private socialService: SocialService, private movieDBService: MovieDBService) { }

    ngOnInit() {
        this.movieDBService.getMovieDBConfiguration().subscribe(response => {
            this.config = response.json();
            for (var i = 1; i <= this.numberOfElements; i++) {
                this.socialService.getUsersThatAlsoLiked().subscribe(data => {
                    if (data.json()) {
                        data = data.json();
                        if (!_.find(this.movies, function (m) { return m.users[0].movieDBId == data[0].movieDBId })) {
                            this.movies.push({ users: data });
                        }
                    }
                    this.loadedElements++;
                    if (this.loadedElements >= this.numberOfElements) {
                        // Load the movies
                        var movieDBIds = [];
                        _.each(_.map(this.movies, 'users'), function (array) {
                            movieDBIds.push(array[0].movieDBId);
                        });
                        if (movieDBIds.length < 1) {
                            this.isLoading = false;
                        }
                        else {
                            this.movieDBService.getMovies(movieDBIds, this.lang).subscribe(data => {
                                if (data) {
                                    data = data.json();
                                    _.each(this.movies, function (m) {
                                        m.movie = _.find(data, function (d) { return d.id == m.users[0].movieDBId; })
                                    })
                                    this.isLoading = false;
                                }
                                else this.router.navigate(['error']);
                            },
                                error => {
                                    this.router.navigate(['error']);
                                });
                        }
                    }
                },
                    error => {
                        this.router.navigate(['error']);
                    });
            } 
        },
            error => {
                this.router.navigate(['error']);
            });

    }
}