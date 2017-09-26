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
var UserMoviesHomePageComponent = /** @class */ (function () {
    function UserMoviesHomePageComponent(authService, router, movieDBService, translate) {
        this.authService = authService;
        this.router = router;
        this.movieDBService = movieDBService;
        this.translate = translate;
        this.hideSearch = false;
        this.searchContainerState = 'notSearched';
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
        this.searchContainerState = 'searched';
        this.movieDBService.search(this.search).subscribe(function (data) {
            _this.searchResults = data.json();
        }, function (error) {
            _this.router.navigate(['/error']);
        });
    };
    UserMoviesHomePageComponent.prototype.rateMovie = function (id) {
        var _this = this;
        this.movieDBService.getMovie(id, this.translate.currentLang).subscribe(function (data) {
            _this.movie = data.json();
            _this.movieQuestionnaireInitLoaded = true;
            _this.hideSearch = true;
        }, function (error) {
            _this.router.navigate(['/error']);
        });
    };
    UserMoviesHomePageComponent.prototype.back = function () {
        this.movieQuestionnaireInitLoaded = false;
        this.hideSearch = false;
    };
    UserMoviesHomePageComponent.prototype.confirm = function () {
        // Add the questionnaire to DB
    };
    UserMoviesHomePageComponent.prototype.movieQuestionnaireChange = function (data) {
        this.movieQuestionnaire = data;
    };
    UserMoviesHomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-movies-home-page.component.html',
            animations: [
                animations_1.trigger('areaState', [
                    animations_1.state('notSearched', animations_1.style({
                        transform: 'translateY(150px)'
                    })),
                    animations_1.transition('notSearched => searched', [
                        animations_1.style({
                            transform: 'translateY(-150px)'
                        }),
                        animations_1.animate('3000ms ease-in')
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movieDB_service_1.MovieDBService, core_2.TranslateService])
    ], UserMoviesHomePageComponent);
    return UserMoviesHomePageComponent;
}());
exports.UserMoviesHomePageComponent = UserMoviesHomePageComponent;
