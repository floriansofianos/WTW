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
var auth_service_1 = require("../auth/auth.service");
var core_2 = require("@ngx-translate/core");
var animations_1 = require("@angular/animations");
var FirstQuestionnaireComponent = (function () {
    function FirstQuestionnaireComponent(authService, translate) {
        this.authService = authService;
        this.translate = translate;
        this.states = ['active', null];
    }
    FirstQuestionnaireComponent.prototype.setTranslation = function (lang) {
        this.translate.use(lang);
    };
    FirstQuestionnaireComponent.prototype.langConfirm = function () {
        this.resetAllStates();
        this.states[1] = 'active';
    };
    FirstQuestionnaireComponent.prototype.agePrevious = function () {
        this.resetAllStates();
        this.states[0] = 'active';
    };
    FirstQuestionnaireComponent.prototype.ageConfirm = function () {
        this.resetAllStates();
    };
    FirstQuestionnaireComponent.prototype.resetAllStates = function () {
        this.states[0] = null;
        this.states[1] = null;
    };
    FirstQuestionnaireComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'first-questionnaire',
            templateUrl: 'first-questionnaire.component.html',
            animations: [
                animations_1.trigger('areaState', [
                    animations_1.state('active', animations_1.style({
                        opacity: 1,
                        transform: 'translateX(-50%)'
                    })),
                    animations_1.transition('void => *', [
                        animations_1.style({
                            transform: 'translateX(-150%)',
                            opacity: 0
                        }),
                        animations_1.animate('100ms 300ms ease-in')
                    ]),
                    animations_1.transition('* => void', [
                        animations_1.animate(300, animations_1.keyframes([
                            animations_1.style({ opacity: 1, transform: 'translateX(-50%)', offset: 0 }),
                            animations_1.style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
                            animations_1.style({ opacity: 0, transform: 'translateX(150%)', offset: 1.0 })
                        ]))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, core_2.TranslateService])
    ], FirstQuestionnaireComponent);
    return FirstQuestionnaireComponent;
}());
exports.FirstQuestionnaireComponent = FirstQuestionnaireComponent;