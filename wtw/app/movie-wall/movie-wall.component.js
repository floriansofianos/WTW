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
var router_1 = require("@angular/router");
var movieDB_service_1 = require("../movieDB/movieDB.service");
var MovieWallComponent = /** @class */ (function () {
    function MovieWallComponent(movieDBService, router) {
        this.movieDBService = movieDBService;
        this.router = router;
        this.notify = new core_1.EventEmitter();
    }
    MovieWallComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.width)
            this.width = 100;
        this.dataLoaded = false;
        this.movieDBService.getMovies(this.movieIds, this.lang).subscribe(function (data) {
            _this.movies = data.json();
            _this.dataLoaded = true;
        }, function (err) {
            _this.router.navigate(['error']);
        });
    };
    MovieWallComponent.prototype.showQuestionnaire = function (id) {
        this.notify.emit({
            movieId: id
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MovieWallComponent.prototype, "movieIds", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MovieWallComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MovieWallComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], MovieWallComponent.prototype, "width", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MovieWallComponent.prototype, "notify", void 0);
    MovieWallComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'movie-wall',
            templateUrl: 'movie-wall.component.html'
        }),
        __metadata("design:paramtypes", [movieDB_service_1.MovieDBService, router_1.Router])
    ], MovieWallComponent);
    return MovieWallComponent;
}());
exports.MovieWallComponent = MovieWallComponent;
