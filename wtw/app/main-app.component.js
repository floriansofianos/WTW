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
var core_2 = require("@ngx-translate/core");
var MainAppComponent = (function () {
    function MainAppComponent(translate) {
        this.translate = translate;
        this.testVariable = 'Test Var';
        var browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    }
    return MainAppComponent;
}());
MainAppComponent = __decorate([
    core_1.Component({
        selector: 'main-app',
        template: "\n<h2>Hello World From Angular 2</h2>\n<h3>{{ 'HOME.TITLE' | translate }}</h3>\n<div>{{ testVariable }}</div>\n"
    }),
    __metadata("design:paramtypes", [core_2.TranslateService])
], MainAppComponent);
exports.MainAppComponent = MainAppComponent;
