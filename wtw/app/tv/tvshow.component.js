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
var tv_questionnaire_service_1 = require("./tv-questionnaire.service");
var router_2 = require("@angular/router");
var common_1 = require("@angular/common");
var _ = require("underscore");
var TVShowPageComponent = (function () {
    function TVShowPageComponent(authService, router, movieDBService, route, tvQuestionnaireService, location) {
        this.authService = authService;
        this.router = router;
        this.movieDBService = movieDBService;
        this.route = route;
        this.tvQuestionnaireService = tvQuestionnaireService;
        this.location = location;
    }
    TVShowPageComponent.prototype.ngOnInit = function () {
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
                    _this.movieDBService.tvAvailableOnPlex(_this.id).subscribe(function (response) {
                        _this.availableOnPlex = response.json().available;
                    }, function (error) {
                        _this.router.navigate(['/error']);
                    });
                }
                // load existing data regarding this movie for the current user
                _this.tvQuestionnaireService.get(_this.id).subscribe(function (data) {
                    _this.tvQuestionnaireInit = data.json();
                    _this.movieDBService.getTV(_this.id, _this.lang).subscribe(function (data) {
                        _this.tvshow = data.json();
                        // Get writers and actors from tv show
                        var allWriters = _.filter(_this.tvshow.tvShowCredits.crew, function (m) { return m.job === 'Screenplay' || m.job === 'Writer'; });
                        var allActors = _this.tvshow.tvShowCredits.cast;
                        _this.tvshow.writers = _.sortBy(allWriters, 'numberOfEpisodes').reverse().slice(0, Math.min(allWriters.length, 5));
                        _this.tvshow.actors = allActors.slice(0, Math.min(allActors.length, 6));
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
    TVShowPageComponent.prototype.tvQuestionnaireChange = function (data) {
        this.tvQuestionnaire = data;
    };
    TVShowPageComponent.prototype.tvQuestionnaireSave = function (event) {
        this.confirm();
    };
    TVShowPageComponent.prototype.confirm = function () {
        var _this = this;
        // Add the questionnaire to DB
        this.showSaveSpinner = true;
        // Save data in DB
        if (this.tvQuestionnaire)
            this.tvQuestionnaireService.create(this.tvQuestionnaire).subscribe(function (response) {
                _this.showSaveSpinner = false;
                _this.back();
            }, function (error) {
                _this.router.navigate(['error']);
            });
    };
    TVShowPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TVShowPageComponent.prototype.back = function () {
        this.location.back();
    };
    TVShowPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'tvshow.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, movieDB_service_1.MovieDBService, router_2.ActivatedRoute, tv_questionnaire_service_1.TVQuestionnaireService, common_1.Location])
    ], TVShowPageComponent);
    return TVShowPageComponent;
}());
exports.TVShowPageComponent = TVShowPageComponent;
//# sourceMappingURL=tvshow.component.js.map