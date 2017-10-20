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
var movieDB_service_1 = require("../movieDB/movieDB.service");
var core_2 = require("@ngx-translate/core");
var animations_1 = require("@angular/animations");
var movie_questionnaire_service_1 = require("../movie/movie-questionnaire.service");
var UserMoviesHomePageComponent = (function () {
    function UserMoviesHomePageComponent(authService, router, movieDBService, translate, movieQuestionnaireService) {
        this.authService = authService;
        this.router = router;
        this.movieDBService = movieDBService;
        this.translate = translate;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.hideSearch = false;
        this.searchContainerState = 'notSearched';
        this.loadingSearch = false;
        this.searchResultsLoaded = 'notLoaded';
        this.showSaveSpinner = false;
        this.leftMenus = [
            { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
            { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE' },
            { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST' }
        ];
    }
    UserMoviesHomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
                _this.configuration = response.json();
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }
        else {
            this.router.navigate(['']);
        }
    };
    UserMoviesHomePageComponent.prototype.searchMovie = function () {
        var _this = this;
        if (this.search && this.search.trim()) {
            this.searchContainerState = 'searched';
            this.loadingSearch = true;
            this.searchResultsLoaded = 'notLoaded';
            this.movieDBService.search(this.search).subscribe(function (data) {
                _this.searchResults = data.json();
                if (_this.searchResults.length < 1) {
                }
                _this.loadingSearch = false;
                _this.searchResultsLoaded = 'loaded';
            }, function (error) {
                _this.router.navigate(['/error']);
            });
        }
    };
    UserMoviesHomePageComponent.prototype.rateMovie = function (id) {
        var _this = this;
        this.searchResultsLoaded = 'notLoaded';
        this.loadingSearch = true;
        // load existing data regarding this movie for the current user
        this.movieQuestionnaireService.get(id).subscribe(function (data) {
            _this.movieQuestionnaireInit = data.json();
            _this.movieDBService.getMovie(id, _this.translate.currentLang).subscribe(function (data) {
                _this.movie = data.json();
                _this.movieQuestionnaireInitLoaded = true;
                _this.hideSearch = true;
                _this.loadingSearch = false;
            }, function (error) {
                _this.router.navigate(['/error']);
            });
        }, function (error) {
            _this.router.navigate(['/error']);
        });
    };
    UserMoviesHomePageComponent.prototype.back = function () {
        this.searchResultsLoaded = 'loaded';
        this.movieQuestionnaireInitLoaded = false;
        this.hideSearch = false;
    };
    UserMoviesHomePageComponent.prototype.movieQuestionnaireSave = function (event) {
        this.confirm();
    };
    UserMoviesHomePageComponent.prototype.confirm = function () {
        var _this = this;
        // Add the questionnaire to DB
        this.showSaveSpinner = true;
        // Save data in DB
        if (this.movieQuestionnaire)
            this.movieQuestionnaireService.create(this.movieQuestionnaire).subscribe(function (response) {
                _this.showSaveSpinner = false;
                _this.back();
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    UserMoviesHomePageComponent.prototype.movieQuestionnaireChange = function (data) {
        this.movieQuestionnaire = data;
    };
    UserMoviesHomePageComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.searchMovie();
        }
    };
    UserMoviesHomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-movies-home-page.component.html',
            animations: [
                animations_1.trigger('searchState', [
                    animations_1.state('notSearched', animations_1.style({
                        transform: 'translateY(150px)'
                    })),
                    animations_1.transition('notSearched => searched', animations_1.animate('800ms ease-in')),
                    animations_1.state('searched', animations_1.style({
                        transform: 'translateY(0px)'
                    }))
                ]),
                animations_1.trigger('searchResultsState', [
                    animations_1.state('notSearched', animations_1.style({
                        opacity: 0
                    })),
                    animations_1.transition('notSearched => searched', animations_1.animate('300ms 200ms ease-in')),
                    animations_1.state('searched', animations_1.style({
                        opacity: 1
                    }))
                ]),
                animations_1.trigger('searchResultsLoadedState', [
                    animations_1.state('notLoaded', animations_1.style({
                        opacity: 0
                    })),
                    animations_1.transition('notLoaded <=> loaded', animations_1.animate('200ms ease-in')),
                    animations_1.state('loaded', animations_1.style({
                        opacity: 1
                    }))
                ]),
            ]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movieDB_service_1.MovieDBService, core_2.TranslateService, movie_questionnaire_service_1.MovieQuestionnaireService])
    ], UserMoviesHomePageComponent);
    return UserMoviesHomePageComponent;
}());
exports.UserMoviesHomePageComponent = UserMoviesHomePageComponent;
