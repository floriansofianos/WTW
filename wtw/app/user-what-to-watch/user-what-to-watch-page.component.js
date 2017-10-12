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
var movie_recommandation_service_1 = require("../movie/movie-recommandation.service");
var movie_questionnaire_service_1 = require("../movie/movie-questionnaire.service");
var core_2 = require("@ngx-translate/core");
var _ = require("underscore");
var UserWhatToWatchPageComponent = (function () {
    function UserWhatToWatchPageComponent(authService, router, movieDBService, movieRecommandation, movieQuestionnaireService, translate) {
        this.authService = authService;
        this.router = router;
        this.movieDBService = movieDBService;
        this.movieRecommandation = movieRecommandation;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.translate = translate;
    }
    UserWhatToWatchPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formWTW = {};
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
        this.lang = currentUser.lang;
        this.formWTW.isRuntimeChecked = false;
        this.movieDBService.getAllGenres().subscribe(function (response) {
            _this.genres = response.json();
            _this.movieRecommandation.getAll().subscribe(function (response) {
                if (response.json().length > 0) {
                    _this.recommandationIds = _.sample(_.map(response.json(), 'movieDBId'), 5);
                }
                else
                    _this.noReco = true;
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserWhatToWatchPageComponent.prototype.onClickMovie = function (event) {
    };
    UserWhatToWatchPageComponent.prototype.clickSearch = function () {
        var _this = this;
        this.movieDBService.wtw(this.lang, this.formWTW.genreSelectValue, this.formWTW.isWatchlistChecked, this.formWTW.isRuntimeChecked, this.formWTW.runtimeLimit).subscribe(function (response) {
            // load existing data regarding this movie for the current user
            var id = response.json().id;
            _this.movieQuestionnaireService.get(id).subscribe(function (data) {
                _this.movieQuestionnaireInit = data.json();
                _this.movieDBService.getMovie(id, _this.translate.currentLang).subscribe(function (data) {
                    _this.movie = data.json();
                    _this.movieQuestionnaireInitLoaded = true;
                }, function (error) {
                    _this.router.navigate(['/error']);
                });
            }, function (error) {
                _this.router.navigate(['/error']);
            });
        }, function (error) {
            _this.router.navigate(['error']);
        });
        console.log(this.formWTW);
    };
    UserWhatToWatchPageComponent.prototype.movieQuestionnaireChange = function (event) {
        this.movieQuestionnaire = event;
    };
    UserWhatToWatchPageComponent.prototype.back = function () {
        this.movieQuestionnaire = null;
        this.movie = null;
        this.movieQuestionnaireInitLoaded = false;
    };
    UserWhatToWatchPageComponent.prototype.movieQuestionnaireSave = function () {
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
    UserWhatToWatchPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-what-to-watch-page.component.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movieDB_service_1.MovieDBService, movie_recommandation_service_1.MovieRecommandationService, movie_questionnaire_service_1.MovieQuestionnaireService, core_2.TranslateService])
    ], UserWhatToWatchPageComponent);
    return UserWhatToWatchPageComponent;
}());
exports.UserWhatToWatchPageComponent = UserWhatToWatchPageComponent;
