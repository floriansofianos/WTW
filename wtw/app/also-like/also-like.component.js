"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var social_service_1 = require("../social/social.service");
var movieDB_service_1 = require("../movieDB/movieDB.service");
var _ = require("underscore");
var AlsoLikeComponent = /** @class */ (function () {
    function AlsoLikeComponent(router, socialService, movieDBService) {
        this.router = router;
        this.socialService = socialService;
        this.movieDBService = movieDBService;
        this.numberOfElements = 5;
        this.loadedElements = 0;
        this.movies = [];
        this.isLoading = true;
    }
    AlsoLikeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.config = response.json();
            for (var i = 1; i <= _this.numberOfElements; i++) {
                _this.socialService.getUsersThatAlsoLiked().subscribe(function (data) {
                    if (data.json()) {
                        data = data.json();
                        if (!_.find(_this.movies, function (m) { return m.users[0].movieDBId == data[0].movieDBId; })) {
                            _this.movies.push({ users: data });
                        }
                    }
                    _this.loadedElements++;
                    if (_this.loadedElements >= _this.numberOfElements) {
                        // Load the movies
                        var movieDBIds = [];
                        _.each(_.map(_this.movies, 'users'), function (array) {
                            movieDBIds.push(array[0].movieDBId);
                        });
                        if (movieDBIds.length < 1) {
                            _this.isLoading = false;
                        }
                        else {
                            _this.movieDBService.getMovies(movieDBIds, _this.lang).subscribe(function (data) {
                                if (data) {
                                    data = data.json();
                                    _.each(_this.movies, function (m) {
                                        m.movie = _.find(data, function (d) { return d.id == m.users[0].movieDBId; });
                                    });
                                    _this.isLoading = false;
                                }
                                else
                                    _this.router.navigate(['error']);
                            }, function (error) {
                                _this.router.navigate(['error']);
                            });
                        }
                    }
                }, function (error) {
                    _this.router.navigate(['error']);
                });
            }
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AlsoLikeComponent.prototype, "lang", void 0);
    AlsoLikeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'also-like',
            templateUrl: 'also-like.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, social_service_1.SocialService, movieDB_service_1.MovieDBService])
    ], AlsoLikeComponent);
    return AlsoLikeComponent;
}());
exports.AlsoLikeComponent = AlsoLikeComponent;
