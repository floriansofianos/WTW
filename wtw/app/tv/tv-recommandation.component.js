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
var router_1 = require("@angular/router");
var tv_recommandation_service_1 = require("./tv-recommandation.service");
var _ = require("underscore");
var TVRecommandationComponent = /** @class */ (function () {
    function TVRecommandationComponent(domSanitizer, translate, tvRecommandationService, router) {
        var _this = this;
        this.domSanitizer = domSanitizer;
        this.translate = translate;
        this.tvRecommandationService = tvRecommandationService;
        this.router = router;
        this.notify = new core_1.EventEmitter();
        this.notifySave = new core_1.EventEmitter();
        this.gradeCommentsLevels = ['WTW.HATE_', 'WTW.DISLIKE_', '', 'WTW.LIKE_', 'WTW.LOVE_'];
        this.onRatingChange = function ($event) {
            if ($event.rating) {
                _this.seenValue = $event.rating;
                _this.getLabelRating();
            }
            _this.onChange();
        };
    }
    TVRecommandationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.movieSeen || changes.wantToWatch) {
            this.onChange();
        }
    };
    TVRecommandationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translate.get('MOVIE_QUESTIONNAIRE.DIRECTOR').subscribe(function (res) {
            _this.jobDirector = res;
        });
        this.translate.get('MOVIE_QUESTIONNAIRE.WRITER').subscribe(function (res) {
            _this.jobWriter = res;
        });
        this.trailerUrl = this.getMovieVideo();
        this.genres = this.movie.genres ? (this.movie.genres.length > 0 ? this.movie.genres.map(function (a) { return a.name; }).reduce(function (a, b) { return a + ', ' + b; }) : '') : '';
        this.movieSeen = this.movieQuestionnaireInit ? this.movieQuestionnaireInit.isSeen : false;
        this.seenValue = this.movieQuestionnaireInit ? this.movieQuestionnaireInit.rating : 3;
        this.getLabelRating();
        this.wantToWatch = this.movieQuestionnaireInit ? this.movieQuestionnaireInit.wantToSee : false;
        this.gradeLoaded = false;
        this.movieRecommandationService.getScore(this.movie.id).subscribe(function (response) {
            var data = response.json();
            _this.gradeRelevant = data.certaintyLevel >= 3;
            _this.grade = Math.floor(data.score);
            _this.gradeComments = _.map(data.comments, function (c) {
                return { isGood: c.level > 0, text: this.gradeCommentsLevels[c.level + 2] + c.type, name: c.name };
            }, _this);
            _this.gradeLoaded = true;
        }, function (error) {
            _this.router.navigate(['/error']);
        });
        this.onChange();
    };
    TVRecommandationComponent.prototype.getAllTrailers = function () {
        if (this.movie.trailers) {
            var trailers = this.movie.trailers.filter(function (t) { return t.type === 'Trailer' && t.site === 'YouTube'; });
            return trailers;
        }
        else
            return null;
    };
    TVRecommandationComponent.prototype.isVideoPlayerDisplayed = function () {
        var trailers = this.getAllTrailers();
        if (trailers) {
            return trailers.length > 0;
        }
        else
            return false;
    };
    TVRecommandationComponent.prototype.getMovieVideo = function () {
        var trailers = this.getAllTrailers();
        if (trailers && trailers.length > 0) {
            return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailers[0].key + '?ecver=2');
        }
        else
            return null;
    };
    TVRecommandationComponent.prototype.onChange = function () {
        this.notify.emit({
            isSeen: this.movieSeen,
            movieDBId: this.movie.id,
            rating: this.seenValue,
            wantToSee: this.wantToWatch
        });
    };
    TVRecommandationComponent.prototype.getLabelRating = function () {
        var _this = this;
        var labelTranslationVar = this.seenValue === 1 ? 'MOVIE_QUESTIONNAIRE.POOR' : (this.seenValue === 2 ? 'MOVIE_QUESTIONNAIRE.AVERAGE' : (this.seenValue === 3 ? 'MOVIE_QUESTIONNAIRE.GOOD' : (this.seenValue === 4 ? 'MOVIE_QUESTIONNAIRE.VERYGOOD' : (this.seenValue === 5 ? 'MOVIE_QUESTIONNAIRE.MASTERPIECE' : 'Error!'))));
        this.translate.get(labelTranslationVar).subscribe(function (res) {
            _this.labelRating = res;
        });
    };
    TVRecommandationComponent.prototype.clickSave = function () {
        this.saving = true;
        this.notifySave.emit({
            clickSave: true
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVRecommandationComponent.prototype, "tvshow", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVRecommandationComponent.prototype, "tvQuestionnaireInit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVRecommandationComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TVRecommandationComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TVRecommandationComponent.prototype, "availableOnPlex", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TVRecommandationComponent.prototype, "notify", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TVRecommandationComponent.prototype, "notifySave", void 0);
    TVRecommandationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tv-recommandation',
            templateUrl: 'tv-recommandation.component.html'
        }),
        __metadata("design:paramtypes", [platform_browser_1.DomSanitizer, core_2.TranslateService, tv_recommandation_service_1.TVRecommandationService, router_1.Router])
    ], TVRecommandationComponent);
    return TVRecommandationComponent;
}());
exports.TVRecommandationComponent = TVRecommandationComponent;
