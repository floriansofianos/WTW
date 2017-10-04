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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var MovieQuestionnaireService = (function () {
    function MovieQuestionnaireService(http) {
        this.http = http;
    }
    MovieQuestionnaireService.prototype.create = function (movieQuestionnaire) {
        return this.http.post('/api/movieQuestionnaire', movieQuestionnaire)
            .catch(this.handleErrors);
    };
    MovieQuestionnaireService.prototype.getAll = function () {
        return this.http.get('/api/movieQuestionnaire')
            .catch(this.handleErrors);
    };
    MovieQuestionnaireService.prototype.get = function (id) {
        return this.http.get('/api/movieQuestionnaire/' + id)
            .catch(this.handleErrors);
    };
    MovieQuestionnaireService.prototype.getCast = function (id) {
        return this.http.get('/api/cast?id=' + id)
            .catch(this.handleErrors);
    };
    MovieQuestionnaireService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    MovieQuestionnaireService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MovieQuestionnaireService);
    return MovieQuestionnaireService;
}());
exports.MovieQuestionnaireService = MovieQuestionnaireService;
