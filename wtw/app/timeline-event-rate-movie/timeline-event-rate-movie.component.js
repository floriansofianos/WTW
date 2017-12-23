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
var movieDB_service_1 = require("../movieDB/movieDB.service");
var router_1 = require("@angular/router");
var _ = require("underscore");
var TimelineEventRateMovieComponent = /** @class */ (function () {
    function TimelineEventRateMovieComponent(movieDBService, router) {
        this.movieDBService = movieDBService;
        this.router = router;
    }
    TimelineEventRateMovieComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        if (!this.isCurUserYou) {
            var curUserId = this.curUserId;
            this.curUsername = _.find(this.friends, function (f) { return f.userId == curUserId; }).username;
        }
        this.movieDBService.getMovie(this.questionnaire.movieDBId, this.lang).subscribe(function (data) {
            _this.movie = data.json();
            _this.isLoading = false;
        }, function (err) {
            _this.router.navigate(['error']);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimelineEventRateMovieComponent.prototype, "curUserId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TimelineEventRateMovieComponent.prototype, "friends", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TimelineEventRateMovieComponent.prototype, "isCurUserYou", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TimelineEventRateMovieComponent.prototype, "questionnaire", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TimelineEventRateMovieComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimelineEventRateMovieComponent.prototype, "lang", void 0);
    TimelineEventRateMovieComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'timeline-event-rate-movie',
            templateUrl: 'timeline-event-rate-movie.component.html'
        }),
        __metadata("design:paramtypes", [movieDB_service_1.MovieDBService, router_1.Router])
    ], TimelineEventRateMovieComponent);
    return TimelineEventRateMovieComponent;
}());
exports.TimelineEventRateMovieComponent = TimelineEventRateMovieComponent;
