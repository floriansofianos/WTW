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
var auth_service_1 = require("./auth/auth.service");
var MainAppComponent = /** @class */ (function () {
    function MainAppComponent(translate, authService) {
        this.translate = translate;
        this.authService = authService;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser)
            translate.use(currentUser.lang);
        else {
            var browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
    }
    MainAppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            template: "\n<router-outlet></router-outlet>\n"
        }),
        __metadata("design:paramtypes", [core_2.TranslateService, auth_service_1.AuthService])
    ], MainAppComponent);
    return MainAppComponent;
}());
exports.MainAppComponent = MainAppComponent;
