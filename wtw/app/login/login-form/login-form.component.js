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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var auth_service_1 = require("../../auth/auth.service");
var LoginFormComponent = (function () {
    function LoginFormComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var login = new forms_1.FormControl();
        var password = new forms_1.FormControl();
        this.loginForm = new forms_1.FormGroup({
            login: login,
            password: password
        });
    };
    LoginFormComponent.prototype.cancel = function () {
        this.router.navigate(['']);
    };
    LoginFormComponent.prototype.login = function (formValues) {
        this.authService.loginUser(formValues.login, formValues.password);
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            template: "\n<form [formGroup]=\"loginForm\" (ngSubmit)=\"login(loginForm.value)\"\n      autocomplete=\"off\" novalidate>\n    <p class=\"form-group\">\n        <input id=\"login\" formControlName=\"login\" type=\"text\" placeholder=\"{{ 'LOGIN.FORM.LOGIN' | translate }}\" />\n    </p>\n    <p class=\"form-group\">\n        <input id=\"password\" formControlName=\"password\" type=\"text\" placeholder=\"{{ 'LOGIN.FORM.PASSWORD' | translate }}\" />\n    </p>\n    <button type=\"submit\" class=\"button-submit\">{{ 'FORM.OK' | translate }}</button>\n    <button type=\"submit\" class=\"button-cancel\" (click)=\"cancel()\">{{ 'FORM.CANCEL' | translate }}</button>\n</form>\n"
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;