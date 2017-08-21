var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var FirstQuestionnaireService = (function () {
    function FirstQuestionnaireService(http) {
        this.http = http;
    }
    FirstQuestionnaireService.prototype.getFirstQuestionnaireMovie = function (lang) {
        return this.http.get('/api/firstQuestionnaire?lang=' + lang)
            .catch(this.handleErrors);
    };
    FirstQuestionnaireService.prototype.getMovieDBConfiguration = function () {
        return this.http.get('/api/movieDBConfiguration')
            .catch(this.handleErrors);
    };
    FirstQuestionnaireService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    FirstQuestionnaireService = __decorate([
        core_1.Injectable()
    ], FirstQuestionnaireService);
    return FirstQuestionnaireService;
})();
exports.FirstQuestionnaireService = FirstQuestionnaireService;
//# sourceMappingURL=first-questionnaire.service.js.map