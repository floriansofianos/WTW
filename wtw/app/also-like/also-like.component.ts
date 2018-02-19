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
    numberOfElements = 5;
    loadedElements = 0;
    loadedTVElements = 0;
    movies: Array<any> = [];
    tvshows: Array<any> = [];
    isLoadingMovies: boolean = true;
    isLoadingTVShows: boolean = true;
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
                            this.isLoadingMovies = false;
                        }
                        else {
                            this.movieDBService.getMovies(movieDBIds, this.lang).subscribe(data => {
                                if (data) {
                                    data = data.json();
                                    _.each(this.movies, function (m) {
                                        m.movie = _.find(data, function (d) { return d.id == m.users[0].movieDBId; })
                                    })
                                    this.isLoadingMovies = false;
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
            for (var i = 1; i <= this.numberOfElements; i++) {
                this.socialService.getUsersThatAlsoTVLiked().subscribe(data => {
                    if (data.json()) {
                        data = data.json();
                        if (!_.find(this.tvshows, function (m) { return m.users[0].movieDBId == data[0].movieDBId })) {
                            this.tvshows.push({ users: data });
                        }
                    }
                    this.loadedTVElements++;
                    if (this.loadedTVElements >= this.numberOfElements) {
                        // Load the movies
                        var movieDBIds = [];
                        _.each(_.map(this.tvshows, 'users'), function (array) {
                            movieDBIds.push(array[0].movieDBId);
                        });
                        if (movieDBIds.length < 1) {
                            this.isLoadingTVShows = false;
                        }
                        else {
                            this.movieDBService.getTVShows(movieDBIds, this.lang).subscribe(data => {
                                if (data) {
                                    data = data.json();
                                    _.each(this.tvshows, function (m) {
                                        m.tvshow = _.find(data, function (d) { return d.id == m.users[0].movieDBId; })
                                    })
                                    this.isLoadingTVShows = false;
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