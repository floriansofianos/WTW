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
var ngx_device_detector_1 = require("ngx-device-detector");
var MainAppComponent = (function () {
    function MainAppComponent(translate, authService, deviceService) {
        this.translate = translate;
        this.authService = authService;
        this.deviceService = deviceService;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser)
            translate.use(currentUser.lang);
        else {
            var browserLang = translate.getBrowserLang();
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
        this.checkDeviceAndRedirect();
    }
    MainAppComponent.prototype.checkDeviceAndRedirect = function () {
        if (this.deviceService.isMobile() || this.deviceService.isTablet())
            window.location.href = 'https://mobile.whatowatch.net';
    };
    MainAppComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            template: "\n<router-outlet></router-outlet>\n"
        }),
        __metadata("design:paramtypes", [core_2.TranslateService, auth_service_1.AuthService, typeof (_a = typeof ngx_device_detector_1.DeviceDetectorService !== "undefined" && ngx_device_detector_1.DeviceDetectorService) === "function" && _a || Object])
    ], MainAppComponent);
    return MainAppComponent;
    var _a;
}());
exports.MainAppComponent = MainAppComponent;
//# sourceMappingURL=main-app.component.js.map