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
var movie_questionnaire_service_1 = require("./movie-questionnaire.service");
var router_2 = require("@angular/router");
var common_1 = require("@angular/common");
var MoviePageComponent = /** @class */ (function () {
    function MoviePageComponent(authService, router, movieDBService, route, movieQuestionnaireService, location) {
        this.authService = authService;
        this.router = router;
        this.movieDBService = movieDBService;
        this.route = route;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.location = location;
    }
    MoviePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        var currentUser = this.authService.getCurrentUser();
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
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.configuration = response.json();
            // Load the asked user profile
            _this.sub = _this.route.params.subscribe(function (params) {
                _this.id = +params['id']; // (+) converts string 'id' to a number
                // Plex integartion
                if (currentUser.plexServerId) {
                    _this.movieDBService.availableOnPlex(_this.id).subscribe(function (response) {
                        _this.availableOnPlex = response.json().available;
                    }, function (error) {
                        _this.router.navigate(['/error']);
                    });
                }
                // load existing data regarding this movie for the current user
                _this.movieQuestionnaireService.get(_this.id).subscribe(function (data) {
                    _this.movieQuestionnaireInit = data.json();
                    _this.movieDBService.getMovie(_this.id, _this.lang).subscribe(function (data) {
                        _this.movie = data.json();
                        _this.isLoading = false;
                    }, function (error) {
                        _this.router.navigate(['/error']);
                    });
                }, function (error) {
                    _this.router.navigate(['/error']);
                });
            });
        });
    };
    MoviePageComponent.prototype.movieQuestionnaireChange = function (data) {
        this.movieQuestionnaire = data;
    };
    MoviePageComponent.prototype.movieQuestionnaireSave = function (event) {
        this.confirm();
    };
    MoviePageComponent.prototype.confirm = function () {
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
    MoviePageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MoviePageComponent.prototype.back = function () {
        this.location.back();
    };
    MoviePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'movie.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movieDB_service_1.MovieDBService, router_2.ActivatedRoute, movie_questionnaire_service_1.MovieQuestionnaireService, common_1.Location])
    ], MoviePageComponent);
    return MoviePageComponent;
}());
exports.MoviePageComponent = MoviePageComponent;
