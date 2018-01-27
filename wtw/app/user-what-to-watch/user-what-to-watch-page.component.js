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
var languages_service_1 = require("../languages/languages.service");
var social_service_1 = require("../social/social.service");
var _ = require("underscore");
var UserWhatToWatchPageComponent = /** @class */ (function () {
    function UserWhatToWatchPageComponent(authService, router, movieDBService, movieRecommandation, movieQuestionnaireService, translate, languagesService, socialService) {
        this.authService = authService;
        this.router = router;
        this.movieDBService = movieDBService;
        this.movieRecommandation = movieRecommandation;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.translate = translate;
        this.languagesService = languagesService;
        this.socialService = socialService;
    }
    UserWhatToWatchPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formWTW = {};
        this.maxReleaseYear = new Date().getFullYear();
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.showPlex = currentUser.plexServerId != undefined;
            this.formWTW.minRelease = currentUser.yearOfBirth ? currentUser.yearOfBirth : new Date().getFullYear() - 50;
            this.formWTW.maxRelease = new Date().getFullYear();
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
        this.socialService.getAllFriends().subscribe(function (response) {
            var allFriends = response.json();
            if (allFriends.length > 0) {
                _this.socialService.getUserProfiles(_.map(allFriends, function (f) { return f.friendUserId; })).subscribe(function (response) {
                    _this.friends = response.json().users;
                }, function (error) {
                    _this.router.navigate(['error']);
                });
            }
        }, function (error) {
            _this.router.navigate(['error']);
        });
        this.movieDBService.getAllGenres().subscribe(function (response) {
            _this.genres = response.json();
            _this.languagesService.getAll().subscribe(function (response) {
                _this.languages = response.json().languages;
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
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserWhatToWatchPageComponent.prototype.onClickMovie = function (event) {
        this.isLoading = true;
        this.router.navigate(['/movie/' + event.movieId]);
    };
    UserWhatToWatchPageComponent.prototype.clickSearch = function () {
        var _this = this;
        if (this.formWTW.minRelease <= this.formWTW.maxRelease && this.formWTW.maxRelease <= new Date().getFullYear()) {
            this.isLoading = true;
            this.movieDBService.wtw(this.lang, this.formWTW.genreSelectValue, this.formWTW.isWatchlistChecked, this.formWTW.isRuntimeChecked, this.formWTW.runtimeLimit, this.formWTW.minRelease, this.formWTW.maxRelease, this.formWTW.isNowPlayingChecked, this.formWTW.countrySelectValue, this.formWTW.withFriend, this.formWTW.usePlex).subscribe(function (response) {
                // load existing data regarding this movie for the current user
                var id = response.json().id;
                if (id)
                    _this.router.navigate(['/movie/' + id]);
                else {
                    _this.isLoading = false;
                    _this.noResults = true;
                }
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }
        else {
            this.notValidReleaseDates = true;
        }
    };
    UserWhatToWatchPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-what-to-watch-page.component.html',
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movieDB_service_1.MovieDBService, movie_recommandation_service_1.MovieRecommandationService, movie_questionnaire_service_1.MovieQuestionnaireService, core_2.TranslateService, languages_service_1.LanguagesService, social_service_1.SocialService])
    ], UserWhatToWatchPageComponent);
    return UserWhatToWatchPageComponent;
}());
exports.UserWhatToWatchPageComponent = UserWhatToWatchPageComponent;
