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
var UserMoviesQuestionnairesPageComponent = (function () {
    function UserMoviesQuestionnairesPageComponent(authService, router, movieQuestionnaireService, movieDBService) {
        this.authService = authService;
        this.router = router;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.movieDBService = movieDBService;
        this.leftMenus = [
            { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
            { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE' },
            { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST' }
        ];
    }
    UserMoviesQuestionnairesPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingState = false;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
        }
        else {
            this.router.navigate(['']);
        }
        this.lang = currentUser.lang;
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.configuration = response.json();
            _this.categoriesNotLoaded = true;
            _this.movieQuestionnaireService.getAll().subscribe(function (data) {
                var movieQuestionnaires = _.filter(data.json(), function (d) { return (!d.isSkipped) && (d.isSeen || !d.wantToSee); });
                _this.categories = [];
                var _loop_1 = function (i) {
                    _this.categories.push({
                        name: i.toString(), type: 'star', values: _.map(_.filter(movieQuestionnaires, function (m) { return m.isSeen && m.rating == i; }), 'movieDBId')
                    });
                };
                for (var i = 1; i <= 5; i++) {
                    _loop_1(i);
                }
                _this.categories.reverse();
                _this.categories.push({
                    name: 'QUESTIONNAIRE.NOT_WANT_TO_SEE', type: 'text', values: _.map(_.filter(movieQuestionnaires, function (m) { return !m.isSeen && !m.wantToSee; }), 'movieDBId')
                });
                _this.categoriesNotLoaded = false;
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserMoviesQuestionnairesPageComponent.prototype.onClickMovie = function (event) {
        var _this = this;
        this.loadingState = true;
        // load existing data regarding this movie for the current user
        this.movieQuestionnaireService.get(event.movieId).subscribe(function (data) {
            _this.movieQuestionnaireInit = data.json();
            _this.movieDBService.getMovie(event.movieId, _this.lang).subscribe(function (data) {
                _this.selectedMovie = data.json();
                _this.loadingState = false;
            }, function (error) {
                _this.router.navigate(['/error']);
            });
        }, function (error) {
            _this.router.navigate(['/error']);
        });
    };
    UserMoviesQuestionnairesPageComponent.prototype.back = function () {
        this.selectedMovie = null;
        this.categories = null;
        this.ngOnInit();
    };
    UserMoviesQuestionnairesPageComponent.prototype.confirm = function () {
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
    UserMoviesQuestionnairesPageComponent.prototype.movieQuestionnaireSave = function (event) {
        this.confirm();
    };
    UserMoviesQuestionnairesPageComponent.prototype.movieQuestionnaireChange = function (data) {
        this.movieQuestionnaire = data;
    };
    UserMoviesQuestionnairesPageComponent.prototype.startNewQuestionnaire = function () {
        this.startNewClicked = true;
    };
    UserMoviesQuestionnairesPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-movies-questionnaires-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movie_questionnaire_service_1.MovieQuestionnaireService, movieDB_service_1.MovieDBService])
    ], UserMoviesQuestionnairesPageComponent);
    return UserMoviesQuestionnairesPageComponent;
}());
exports.UserMoviesQuestionnairesPageComponent = UserMoviesQuestionnairesPageComponent;
