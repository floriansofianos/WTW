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
var tv_questionnaire_service_1 = require("../tv/tv-questionnaire.service");
var user_tv_questionnaire_service_1 = require("./user-tv-questionnaire.service");
var animations_1 = require("@angular/animations");
var movieDB_service_1 = require("../movieDB/movieDB.service");
var countries_service_1 = require("../countries/countries.service");
var router_1 = require("@angular/router");
var TVQuestionnaireComponent = (function () {
    function TVQuestionnaireComponent(authService, translate, router, tvQuestionnaireService, movieDBService, userTVQuestionnaireService, countriesService) {
        this.authService = authService;
        this.translate = translate;
        this.router = router;
        this.tvQuestionnaireService = tvQuestionnaireService;
        this.movieDBService = movieDBService;
        this.userTVQuestionnaireService = userTVQuestionnaireService;
        this.countriesService = countriesService;
        this.previousTVShows = [];
        this.states = ['active', null, null];
    }
    TVQuestionnaireComponent.prototype.ngOnInit = function () {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser.yearOfBirth)
            this.yearOfBirth = currentUser.yearOfBirth;
        else
            this.yearOfBirth = 1980;
        if (currentUser.country)
            this.selectedCountry = currentUser.country;
        this.questionsToAnswer = 10;
        this.username = currentUser.username;
        this.tvIndex = -1;
        this.questionAnswered = 0;
        this.lang = this.translate.currentLang;
        this.showSpinner = true;
        this.getNextAgeStep();
    };
    TVQuestionnaireComponent.prototype.getNextAgeStep = function () {
        var _this = this;
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.configuration = response.json();
            _this.questionAnswered++;
            _this.showNextTVShow();
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    TVQuestionnaireComponent.prototype.tvQuestionnaireChange = function (data) {
        this.tvQuestionnaire = data;
    };
    TVQuestionnaireComponent.prototype.tvPrevious = function () {
        this.showSpinner = true;
        this.tvIndex--;
        if (this.tvIndex < 0) {
            this.questionAnswered--;
            this.setStateActive(1);
        }
        else {
            this.tvshow = this.previousTVShows[this.tvIndex].tvshow;
            this.tvQuestionnaireInit = this.previousTVShows[this.tvIndex].movieQuestionnaire;
            if (!this.tvQuestionnaireInit.isSkipped)
                this.questionAnswered--;
        }
        this.showSpinner = false;
    };
    TVQuestionnaireComponent.prototype.showNextTVShow = function () {
        if (this.previousTVShows && this.previousTVShows[this.tvIndex + 1]) {
            this.tvIndex++;
            this.tvshow = this.previousTVShows[this.tvIndex].tvshow;
            this.tvQuestionnaireInit = this.previousTVShows[this.tvIndex].tvQuestionnaire;
            this.showSpinner = false;
            if (this.tvIndex === 0)
                this.setStateActive(2);
        }
        else {
            this.getTVQuestionnaireFromUserQuestionnaire();
        }
    };
    TVQuestionnaireComponent.prototype.getTVQuestionnaireFromUserQuestionnaire = function () {
        var _this = this;
        this.userTVQuestionnaireService.get(this.translate.currentLang).subscribe(function (response) {
            if (response.json().reload) {
                _this.getTVQuestionnaireFromUserQuestionnaire();
            }
            else
                _this.showTVShowFromAPIResponse(response);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    TVQuestionnaireComponent.prototype.showTVShowFromAPIResponse = function (response) {
        this.tvshow = response.json();
        this.tvIndex++;
        this.showSpinner = false;
        if (this.tvIndex === 0)
            this.setStateActive(2);
        this.storePreviousTVShow(true);
    };
    TVQuestionnaireComponent.prototype.tvSkip = function () {
        var _this = this;
        this.showSpinner = true;
        this.tvQuestionnaire.isSkipped = true;
        this.storePreviousTVShow(false);
        // Save data in DB
        if (this.tvQuestionnaire)
            this.tvQuestionnaireService.create(this.tvQuestionnaire).subscribe(function (response) {
                _this.showNextTVShow();
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    TVQuestionnaireComponent.prototype.storePreviousTVShow = function (isFirstSave) {
        if (this.previousTVShows[this.tvIndex]) {
            this.previousTVShows[this.tvIndex] = {
                tvshow: this.tvshow,
                tvQuestionnaire: this.tvQuestionnaire
            };
        }
        else
            this.previousTVShows.push({
                tvshow: this.tvshow,
                tvQuestionnaire: isFirstSave ? null : this.tvQuestionnaire
            });
    };
    TVQuestionnaireComponent.prototype.tvConfirm = function () {
        var _this = this;
        this.showSpinner = true;
        this.storePreviousTVShow(false);
        // Save data in DB
        if (this.tvQuestionnaire)
            this.tvQuestionnaireService.create(this.tvQuestionnaire).subscribe(function (response) {
                _this.questionAnswered++;
                // Check if we need to show more movies
                if (_this.questionAnswered >= _this.questionsToAnswer) {
                }
                else {
                    _this.showNextTVShow();
                }
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    TVQuestionnaireComponent.prototype.setStateActive = function (i) {
        this.resetAllStates();
        this.states[i] = 'active';
    };
    TVQuestionnaireComponent.prototype.resetAllStates = function () {
        this.states.forEach(function (o, i, a) { return a[i] = null; });
    };
    TVQuestionnaireComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tv-questionnaire',
            templateUrl: 'tv-questionnaire.component.html',
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
        __metadata("design:paramtypes", [auth_service_1.AuthService, core_2.TranslateService, router_1.Router, tv_questionnaire_service_1.TVQuestionnaireService, movieDB_service_1.MovieDBService, user_tv_questionnaire_service_1.UserTVQuestionnaireService, countries_service_1.CountriesService])
    ], TVQuestionnaireComponent);
    return TVQuestionnaireComponent;
}());
exports.TVQuestionnaireComponent = TVQuestionnaireComponent;
//# sourceMappingURL=tv-questionnaire.component.js.map