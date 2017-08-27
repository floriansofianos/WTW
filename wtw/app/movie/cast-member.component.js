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
var bootstrap_1 = require("ngx-modialog/plugins/bootstrap");
var movie_questionnaire_service_1 = require("../movie/movie-questionnaire.service");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var CastMemberComponent = (function () {
    function CastMemberComponent(modal, movieQuestionnaireService, router, translate) {
        this.modal = modal;
        this.movieQuestionnaireService = movieQuestionnaireService;
        this.router = router;
        this.translate = translate;
    }
    CastMemberComponent.prototype.isImgProfile = function (file) {
        if (file === null || file === '')
            return false;
        else
            return true;
    };
    CastMemberComponent.prototype.modalCast = function () {
        var _this = this;
        this.movieQuestionnaireService.getCast(this.castMember.id).subscribe(function (response) {
            var details = response.json();
            var modalTitle = _this.isCrew ? _this.translate.get('CAST.ALSO_KNOWN') : _this.translate.get('CAST.ALSO_SEEN');
            _this.modal.alert()
                .size('lg')
                .showClose(true)
                .title(_this.castMember.name)
                .body("\n            <div><h4>" + modalTitle + "</h4></div>\n            <div class=\"modal-movies-container\">\n            " + _this.getAllMoviesHtml(details) + "\n            </div>\n            ")
                .open();
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    CastMemberComponent.prototype.getPosterHtml = function (movie) {
        return "\n            <div class=\"movie-poster-container\">\n                <img width=\"200\" src=\"" + this.config.images.base_url + this.config.images.poster_sizes[3] + movie.poster_path + "\" />\n                <div class=\"modal-movie-title\">" + movie.title + "</div>\n                <div class=\"modal-movie-job\">" + (this.isCrew ? this.job : movie.character) + "</div>\n            </div>\n            ";
    };
    CastMemberComponent.prototype.getAllMoviesHtml = function (details) {
        var movies = [];
        if (this.isCrew) {
            for (var i = 0; i < Math.min(details.crew.length, 5); i++) {
                movies.push(details.crew[i]);
            }
        }
        else {
            for (var i = 0; i < Math.min(details.cast.length, 5); i++) {
                movies.push(details.cast[i]);
            }
        }
        var result = '';
        for (var i = 0; i < movies.length; i++) {
            result += this.getPosterHtml(movies[i]);
        }
        return result;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CastMemberComponent.prototype, "castMember", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CastMemberComponent.prototype, "config", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CastMemberComponent.prototype, "job", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CastMemberComponent.prototype, "isCrew", void 0);
    CastMemberComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cast-member',
            templateUrl: 'cast-member.component.html'
        }),
        __metadata("design:paramtypes", [bootstrap_1.Modal, movie_questionnaire_service_1.MovieQuestionnaireService, router_1.Router, core_2.TranslateService])
    ], CastMemberComponent);
    return CastMemberComponent;
}());
exports.CastMemberComponent = CastMemberComponent;
