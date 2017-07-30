var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
var LoginFormComponent = (function () {
    function LoginFormComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var login = new FormControl();
        var password = new FormControl();
        this.loginForm = new FormGroup({
            login: login,
            password: password
        });
    };
    LoginFormComponent.prototype.cancel = function () {
        this.router.navigate(['']);
    };
    LoginFormComponent.prototype.login = function (formValues) {
        var _this = this;
        this.authService.loginUser(formValues.login, formValues.password).subscribe(function (response) {
            _this.authService.setCurrentUser(response.json());
            _this.router.navigate(['']);
        }, function (error) {
            _this.showError = true;
        });
    };
    return LoginFormComponent;
}());
LoginFormComponent = __decorate([
    Component({
        selector: 'login-form',
        template: "\n<form [formGroup]=\"loginForm\" (ngSubmit)=\"login(loginForm.value)\"\n      autocomplete=\"off\" novalidate>\n    <p class=\"form-group\">\n        <input id=\"login\" formControlName=\"login\" type=\"text\" placeholder=\"{{ 'LOGIN.FORM.LOGIN' | translate }}\" />\n    </p>\n    <p class=\"form-group\">\n        <input id=\"password\" formControlName=\"password\" type=\"text\" placeholder=\"{{ 'LOGIN.FORM.PASSWORD' | translate }}\" />\n    </p>\n    <div *ngIf=\"showError\">{{ 'LOGIN.FORM.WRONGPASSWORD' | translate }}</div>\n    <button type=\"submit\" class=\"button-submit\">{{ 'FORM.OK' | translate }}</button>\n    <button type=\"submit\" class=\"button-cancel\" (click)=\"cancel()\">{{ 'FORM.CANCEL' | translate }}</button>\n</form>\n"
    }),
    __metadata("design:paramtypes", [Router, AuthService])
], LoginFormComponent);
export { LoginFormComponent };
//# sourceMappingURL=login-form.component.js.map