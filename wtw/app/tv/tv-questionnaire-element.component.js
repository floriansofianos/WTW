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
var core_2 = require("@ngx-translate/core");
var _ = require("underscore");
var TVQuestionnaireElementComponent = (function () {
    function TVQuestionnaireElementComponent(domSanitizer, translate) {
        var _this = this;
        this.domSanitizer = domSanitizer;
        this.translate = translate;
        this.notify = new core_1.EventEmitter();
        this.onRatingChange = function ($event) {
            if ($event.rating) {
                _this.seenValue = $event.rating;
                _this.getLabelRating();
            }
            _this.onChange();
        };
    }
    TVQuestionnaireElementComponent.prototype.ngOnChanges = function (changes) {
        if (changes.tvshow) {
            this.ngOnInit();
        }
        if (changes.movieSeen || changes.wantToWatch) {
            this.onChange();
        }
    };
    TVQuestionnaireElementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translate.get('MOVIE_QUESTIONNAIRE.CREATOR').subscribe(function (res) {
            _this.jobCreator = res;
        });
        this.translate.get('MOVIE_QUESTIONNAIRE.WRITER').subscribe(function (res) {
            _this.jobWriter = res;
        });
        this.trailerUrl = this.getTVVideo();
        this.genres = this.tvshow.tvShowInfo.genres ? (this.tvshow.tvShowInfo.genres.length > 0 ? this.tvshow.tvShowInfo.genres.map(function (a) { return a.name; }).reduce(function (a, b) { return a + ', ' + b; }) : '') : '';
        this.movieSeen = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.isSeen : false;
        this.seenValue = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.rating : 3;
        // Get writers and actors from tv show
        var allWriters = _.filter(this.tvshow.tvShowCredits.crew, function (m) { return m.job === 'Screenplay' || m.job === 'Writer'; });
        var allActors = this.tvshow.tvShowCredits.cast;
        this.tvshow.writers = _.sortBy(allWriters, 'numberOfEpisodes').reverse().slice(0, Math.min(allWriters.length, 5));
        this.tvshow.actors = allActors.slice(0, Math.min(allActors.length, 6));
        this.getLabelRating();
        this.wantToWatch = this.tvQuestionnaireInit ? this.tvQuestionnaireInit.wantToSee : false;
        this.onChange();
    };
    TVQuestionnaireElementComponent.prototype.getAllTrailers = function () {
        if (this.tvshow.trailers) {
            var trailers = _.filter(this.tvshow.trailers.results, function (t) { return t.type === 'Trailer' && t.site === 'YouTube'; });
            return trailers;
        }
        else
            return null;
    };
    TVQuestionnaireElementComponent.prototype.isVideoPlayerDisplayed = function () {
        var trailers = this.getAllTrailers();
        if (trailers) {
            return trailers.length > 0;
        }
        else
            return false;
    };
    TVQuestionnaireElementComponent.prototype.getTVVideo = function () {
        var trailers = this.getAllTrailers();
        if (trailers && trailers.length > 0) {
            return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailers[0].key + '?ecver=2');
        }
        else
            return null;
    };
    TVQuestionnaireElementComponent.prototype.onChange = function () {
        this.notify.emit({
            isSeen: this.movieSeen,
            movieDBId: this.tvshow.tvShowInfo.id,
            rating: this.seenValue,
            wantToSee: this.wantToWatch
        });
    };
    TVQuestionnaireElementComponent.prototype.getLabelRating = function () {
        var _this = this;
        var labelTranslationVar = this.seenValue === 1 ? 'MOVIE_QUESTIONNAIRE.POOR' : (this.seenValue === 2 ? 'MOVIE_QUESTIONNAIRE.AVERAGE' : (this.seenValue === 3 ? 'MOVIE_QUESTIONNAIRE.GOOD' : (this.seenValue === 4 ? 'MOVIE_QUESTIONNAIRE.VERYGOOD' : (this.seenValue === 5 ? 'MOVIE_QUESTIONNAIRE.MASTERPIECE' : 'Error!'))));
        this.translate.get(labelTranslationVar).subscribe(function (res) {
            _this.labelRating = res;
        });
    };
    TVQuestionnaireElementComponent.prototype.tvSkip = function () {
        this.notify.emit({
            skipTV: true
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVQuestionnaireElementComponent.prototype, "tvshow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVQuestionnaireElementComponent.prototype, "tvQuestionnaireInit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVQuestionnaireElementComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TVQuestionnaireElementComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TVQuestionnaireElementComponent.prototype, "notify", void 0);
    TVQuestionnaireElementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tv-questionnaire-element',
            templateUrl: 'tv-questionnaire-element.component.html'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, core_2.TranslateService])
    ], TVQuestionnaireElementComponent);
    return TVQuestionnaireElementComponent;
}());
exports.TVQuestionnaireElementComponent = TVQuestionnaireElementComponent;
//# sourceMappingURL=tv-questionnaire-element.component.js.map