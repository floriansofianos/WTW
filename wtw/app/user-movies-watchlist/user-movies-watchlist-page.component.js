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
var auth_service_1 = require("../auth/auth.service");
var router_1 = require("@angular/router");
var movie_questionnaire_service_1 = require("../movie/movie-questionnaire.service");
var movieDB_service_1 = require("../movieDB/movieDB.service");
var _ = require("underscore");
var UserMoviesWatchlistPageComponent = (function () {
    function UserMoviesWatchlistPageComponent(authService, router, movieQuestionnaireService, movieDBService) {
        this.authService = authService;
        this.router = router;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.movieDBService = movieDBService;
        this.leftMenus = [
            { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
            { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE' },
            { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST', selected: true }
        ];
    }
    UserMoviesWatchlistPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
        this.lang = currentUser.lang;
        this.loadingState = true;
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.configuration = response.json();
            _this.movieQuestionnaireService.getWatchlist().subscribe(function (data) {
                _this.movieIds = _.map(data.json(), 'movieDBId');
                _this.loadingState = false;
            }, function (error) {
                throw new Error(error);
            });
        }, function (error) {
            throw new Error(error);
        });
    };
    UserMoviesWatchlistPageComponent.prototype.onClickMovie = function (event) {
        this.router.navigate(['/movie/' + event.movieId]);
    };
    UserMoviesWatchlistPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-movies-watchlist-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movie_questionnaire_service_1.MovieQuestionnaireService, movieDB_service_1.MovieDBService])
    ], UserMoviesWatchlistPageComponent);
    return UserMoviesWatchlistPageComponent;
}());
exports.UserMoviesWatchlistPageComponent = UserMoviesWatchlistPageComponent;
//# sourceMappingURL=user-movies-watchlist-page.component.js.map