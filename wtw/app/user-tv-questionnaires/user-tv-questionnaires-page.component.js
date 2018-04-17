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
var tv_questionnaire_service_1 = require("../tv/tv-questionnaire.service");
var movieDB_service_1 = require("../movieDB/movieDB.service");
var _ = require("underscore");
var UserTVQuestionnairesPageComponent = (function () {
    function UserTVQuestionnairesPageComponent(authService, router, tvQuestionnaireService, movieDBService) {
        this.authService = authService;
        this.router = router;
        this.tvQuestionnaireService = tvQuestionnaireService;
        this.movieDBService = movieDBService;
        this.leftMenus = [
            { icon: 'fa-home', path: 'home', title: 'LEFT_MENU.HOME' },
            { icon: 'fa-question', path: 'questionnaires', title: 'LEFT_MENU.QUESTIONNAIRE', selected: true },
            { icon: 'fa-film', path: 'watchlist', title: 'LEFT_MENU.WATCHLIST' }
        ];
    }
    UserTVQuestionnairesPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingState = false;
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
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.configuration = response.json();
            _this.categoriesNotLoaded = true;
            _this.tvQuestionnaireService.getAll().subscribe(function (data) {
                var tvQuestionnaires = _.filter(data.json(), function (d) { return (!d.isSkipped) && (d.isSeen || !d.wantToSee); });
                _this.categories = [];
                var _loop_1 = function (i) {
                    _this.categories.push({
                        name: i.toString(), type: 'star', values: _.map(_.filter(tvQuestionnaires, function (m) { return m.isSeen && m.rating == i; }), 'movieDBId')
                    });
                };
                for (var i = 1; i <= 5; i++) {
                    _loop_1(i);
                }
                _this.categories.reverse();
                _this.categories.push({
                    name: 'QUESTIONNAIRE.NOT_WANT_TO_SEE', type: 'text', values: _.map(_.filter(tvQuestionnaires, function (m) { return !m.isSeen && !m.wantToSee; }), 'movieDBId')
                });
                _this.categoriesNotLoaded = false;
            }, function (error) {
                throw new Error(error);
            });
        }, function (error) {
            throw new Error(error);
        });
    };
    UserTVQuestionnairesPageComponent.prototype.onClickMovie = function (event) {
        this.router.navigate(['/tvshow/' + event.movieId]);
    };
    UserTVQuestionnairesPageComponent.prototype.startNewQuestionnaire = function () {
        this.startNewClicked = true;
    };
    UserTVQuestionnairesPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-tv-questionnaires-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, tv_questionnaire_service_1.TVQuestionnaireService, movieDB_service_1.MovieDBService])
    ], UserTVQuestionnairesPageComponent);
    return UserTVQuestionnairesPageComponent;
}());
exports.UserTVQuestionnairesPageComponent = UserTVQuestionnairesPageComponent;
//# sourceMappingURL=user-tv-questionnaires-page.component.js.map