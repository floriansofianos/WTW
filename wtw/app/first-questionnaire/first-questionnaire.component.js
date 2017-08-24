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
var core_2 = require("@ngx-translate/core");
var first_questionnaire_service_1 = require("../first-questionnaire/first-questionnaire.service");
var movie_questionnaire_service_1 = require("../movie/movie-questionnaire.service");
var animations_1 = require("@angular/animations");
var router_1 = require("@angular/router");
var FirstQuestionnaireComponent = (function () {
    function FirstQuestionnaireComponent(authService, translate, router, firstQuestionnaireService, movieQuestionnaireService) {
        this.authService = authService;
        this.translate = translate;
        this.router = router;
        this.firstQuestionnaireService = firstQuestionnaireService;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.previousMovies = [];
        this.states = ['active', null, null];
    }
    FirstQuestionnaireComponent.prototype.ngOnInit = function () {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser.age)
            this.age = currentUser.age;
        else
            this.age = 30;
        this.movieIndex = -1;
        this.questionAnswered = 0;
        if (currentUser.firstQuestionnaireCompleted) {
            this.questionAnswered = 12;
            this.setStateActive(2);
        }
    };
    FirstQuestionnaireComponent.prototype.setTranslation = function (lang) {
        this.translate.use(lang);
    };
    FirstQuestionnaireComponent.prototype.isTranslation = function (lang) {
        return this.translate.currentLang === lang;
    };
    FirstQuestionnaireComponent.prototype.langSkip = function () {
        this.setStateActive(1);
        this.questionAnswered++;
    };
    FirstQuestionnaireComponent.prototype.ageSkip = function () {
        this.showSpinner = true;
        this.getNextAgeStep();
    };
    FirstQuestionnaireComponent.prototype.langConfirm = function () {
        var _this = this;
        this.showSpinner = true;
        // Save data in DB
        this.authService.setUserProperty('lang', this.translate.currentLang).subscribe(function (response) {
            _this.setStateActive(1);
            _this.showSpinner = false;
            _this.questionAnswered++;
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    FirstQuestionnaireComponent.prototype.agePrevious = function () {
        this.setStateActive(0);
        this.questionAnswered--;
    };
    FirstQuestionnaireComponent.prototype.ageConfirm = function () {
        var _this = this;
        this.showSpinner = true;
        // Save data in DB
        if (this.age)
            this.authService.setUserProperty('age', this.age).subscribe(function (response) {
                _this.getNextAgeStep();
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    FirstQuestionnaireComponent.prototype.getNextAgeStep = function () {
        var _this = this;
        this.firstQuestionnaireService.getMovieDBConfiguration().subscribe(function (response) {
            _this.configuration = response.json();
            _this.questionAnswered++;
            _this.showNextMovie();
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    FirstQuestionnaireComponent.prototype.movieQuestionnaireChange = function (data) {
        this.movieQuestionnaire = data;
    };
    FirstQuestionnaireComponent.prototype.moviePrevious = function () {
        this.showSpinner = true;
        this.movieIndex--;
        this.questionAnswered--;
        if (this.movieIndex < 0) {
            this.setStateActive(1);
        }
        else {
            this.movie = this.previousMovies[this.movieIndex].movie;
            this.movieQuestionnaireInit = this.previousMovies[this.movieIndex].movieQuestionnaire;
        }
        this.showSpinner = false;
    };
    FirstQuestionnaireComponent.prototype.showNextMovie = function () {
        var _this = this;
        if (this.previousMovies && this.previousMovies[this.movieIndex + 1]) {
            this.movieIndex++;
            this.movie = this.previousMovies[this.movieIndex].movie;
            this.movieQuestionnaireInit = this.previousMovies[this.movieIndex].movieQuestionnaire;
            this.showSpinner = false;
            if (this.movieIndex === 0)
                this.setStateActive(2);
        }
        else {
            this.firstQuestionnaireService.getFirstQuestionnaireMovie(this.translate.currentLang).subscribe(function (response) {
                _this.movie = response.json();
                _this.movieIndex++;
                _this.showSpinner = false;
                if (_this.movieIndex === 0)
                    _this.setStateActive(2);
                _this.storePreviousMovie(true);
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }
    };
    FirstQuestionnaireComponent.prototype.movieSkip = function () {
        this.showSpinner = true;
        this.storePreviousMovie(false);
        this.showNextMovie();
    };
    FirstQuestionnaireComponent.prototype.storePreviousMovie = function (isFirstSave) {
        if (this.previousMovies[this.movieIndex]) {
            this.previousMovies[this.movieIndex] = {
                movie: this.movie,
                movieQuestionnaire: this.movieQuestionnaire
            };
        }
        else
            this.previousMovies.push({
                movie: this.movie,
                movieQuestionnaire: isFirstSave ? null : this.movieQuestionnaire
            });
    };
    FirstQuestionnaireComponent.prototype.movieConfirm = function () {
        var _this = this;
        this.showSpinner = true;
        this.storePreviousMovie(false);
        // Save data in DB
        if (this.movieQuestionnaire)
            this.movieQuestionnaireService.create(this.movieQuestionnaire).subscribe(function (response) {
                _this.questionAnswered++;
                // Check if we need to show more movies
                if (_this.questionAnswered >= 12) {
                    _this.authService.setUserProperty('firstQuestionnaireCompleted', true).subscribe(function (response) {
                        _this.showSpinner = false;
                    }, function (error) {
                        _this.router.navigate(['error']);
                    });
                }
                else {
                    _this.showNextMovie();
                }
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    FirstQuestionnaireComponent.prototype.setStateActive = function (i) {
        this.resetAllStates();
        this.states[i] = 'active';
    };
    FirstQuestionnaireComponent.prototype.resetAllStates = function () {
        this.states.forEach(function (o, i, a) { return a[i] = null; });
    };
    FirstQuestionnaireComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'first-questionnaire',
            templateUrl: 'first-questionnaire.component.html',
            animations: [
                animations_1.trigger('areaState', [
                    animations_1.state('active', animations_1.style({
                        opacity: 1,
                        transform: 'translateX(-50%)'
                    })),
                    animations_1.transition('void => *', [
                        animations_1.style({
                            transform: 'translateX(-150%)',
                            opacity: 0
                        }),
                        animations_1.animate('100ms 300ms ease-in')
                    ]),
                    animations_1.transition('* => void', [
                        animations_1.animate(300, animations_1.keyframes([
                            animations_1.style({ opacity: 1, transform: 'translateX(-50%)', offset: 0 }),
                            animations_1.style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                            animations_1.style({ opacity: 0, transform: 'translateX(150%)', offset: 1.0 })
                        ]))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, core_2.TranslateService, router_1.Router, first_questionnaire_service_1.FirstQuestionnaireService, movie_questionnaire_service_1.MovieQuestionnaireService])
    ], FirstQuestionnaireComponent);
    return FirstQuestionnaireComponent;
}());
exports.FirstQuestionnaireComponent = FirstQuestionnaireComponent;
