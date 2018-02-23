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
var TVQuestionnaireService = (function () {
    function TVQuestionnaireService(http) {
        this.http = http;
    }
    TVQuestionnaireService.prototype.create = function (tvQuestionnaire) {
        return this.http.post('/api/tvQuestionnaire', tvQuestionnaire)
            .catch(this.handleErrors);
    };
    TVQuestionnaireService.prototype.getAll = function () {
        return this.http.get('/api/tvQuestionnaire')
            .catch(this.handleErrors);
    };
    TVQuestionnaireService.prototype.getWatchlist = function () {
        return this.http.get('/api/tvQuestionnaire/watchlist')
            .catch(this.handleErrors);
    };
    TVQuestionnaireService.prototype.get = function (id) {
        return this.http.get('/api/tvQuestionnaire/' + id)
            .catch(this.handleErrors);
    };
    TVQuestionnaireService.prototype.getCast = function (creatorId, writerId, actorId, lang) {
        var params = {};
        if (creatorId)
            params.creatorId = creatorId;
        if (writerId)
            params.writerId = writerId;
        if (actorId)
            params.actorId = actorId;
        params.lang = lang;
        return this.http.get('/api/cast', { params: params })
            .catch(this.handleErrors);
    };
    TVQuestionnaireService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    TVQuestionnaireService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TVQuestionnaireService);
    return TVQuestionnaireService;
}());
exports.TVQuestionnaireService = TVQuestionnaireService;
//# sourceMappingURL=tv-questionnaire.service.js.map