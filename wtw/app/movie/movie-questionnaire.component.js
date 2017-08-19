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
var platform_browser_1 = require("@angular/platform-browser");
var MovieQuestionnaireComponent = (function () {
    function MovieQuestionnaireComponent(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    MovieQuestionnaireComponent.prototype.ngOnInit = function () {
        this.trailerUrl = this.getMovieVideo();
        this.genres = this.movie.genres.map(function (a) { return a.name; }).reduce(function (a, b) { return a + ', ' + b; });
        this.movieSeen = false;
        this.seenValue = 1;
        this.sliderConfiguration = {
            pips: {
                mode: 'steps',
                density: 1,
                format: {
                    to: this.updatePips
                }
            }
        };
    };
    MovieQuestionnaireComponent.prototype.updatePips = function (value) {
        if (value === 0)
            value = 'Poor';
        if (value === 1)
            value = 'Average';
        if (value === 2)
            value = 'Good';
        if (value === 3)
            value = 'Very Good';
        return value;
    };
    MovieQuestionnaireComponent.prototype.getAllTrailers = function () {
        if (this.movie.trailers) {
            var trailers = this.movie.trailers.filter(function (t) { return t.type === 'Trailer' && t.site === 'YouTube'; });
            return trailers;
        }
        else
            return null;
    };
    MovieQuestionnaireComponent.prototype.isVideoPlayerDisplayed = function () {
        var trailers = this.getAllTrailers();
        if (trailers) {
            return trailers.length > 0;
        }
        else
            return false;
    };
    MovieQuestionnaireComponent.prototype.getMovieVideo = function () {
        var trailers = this.getAllTrailers();
        if (trailers && trailers.length > 0) {
            return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailers[0].key + '?ecver=2');
        }
        else
            return null;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MovieQuestionnaireComponent.prototype, "movie", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MovieQuestionnaireComponent.prototype, "config", void 0);
    MovieQuestionnaireComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'movie-questionnaire',
            templateUrl: 'movie-questionnaire.component.html'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
    ], MovieQuestionnaireComponent);
    return MovieQuestionnaireComponent;
}());
exports.MovieQuestionnaireComponent = MovieQuestionnaireComponent;
