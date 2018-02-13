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
var TVWallComponent = (function () {
    function TVWallComponent(movieDBService, router) {
        this.movieDBService = movieDBService;
        this.router = router;
        this.notify = new core_1.EventEmitter();
    }
    TVWallComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.width)
            this.width = 100;
        this.dataLoaded = false;
        this.movieDBService.getTVShows(this.movieIds, this.lang).subscribe(function (data) {
            _this.tvshows = data.json();
            _this.dataLoaded = true;
        }, function (err) {
            _this.router.navigate(['error']);
        });
    };
    TVWallComponent.prototype.showQuestionnaire = function (id) {
        this.notify.emit({
            movieId: id
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TVWallComponent.prototype, "movieIds", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TVWallComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TVWallComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TVWallComponent.prototype, "width", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TVWallComponent.prototype, "notify", void 0);
    TVWallComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tv-wall',
            templateUrl: 'tv-wall.component.html'
        }),
        __metadata("design:paramtypes", [movieDB_service_1.MovieDBService, router_1.Router])
    ], TVWallComponent);
    return TVWallComponent;
}());
exports.TVWallComponent = TVWallComponent;
//# sourceMappingURL=tv-wall.component.js.map