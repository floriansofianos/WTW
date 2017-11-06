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
var core_2 = require("@ngx-translate/core");
var LoginFormComponent = (function () {
    function LoginFormComponent(router, authService, translate) {
        this.router = router;
        this.authService = authService;
        this.translate = translate;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var login = new forms_1.FormControl();
        var password = new forms_1.FormControl();
        var rememberMe = new forms_1.FormControl();
        var email = new forms_1.FormControl();
        this.loginForm = new forms_1.FormGroup({
            login: login,
            password: password,
            rememberMe: rememberMe
        });
        this.forgotPasswordForm = new forms_1.FormGroup({
            email: email
        });
        this.showForgotPassword = false;
    };
    LoginFormComponent.prototype.cancel = function () {
        this.router.navigate(['']);
    };
    LoginFormComponent.prototype.login = function (formValues) {
        var _this = this;
        this.showSpinner = true;
        this.authService.loginUser(formValues.login, formValues.password, formValues.rememberMe).subscribe(function (response) {
            var currentUser = response.json();
            _this.authService.setCurrentUser(currentUser);
            if (currentUser.lang)
                _this.translate.use(currentUser.lang);
            _this.router.navigate(['/user/home']);
        }, function (error) {
            if (error == 500)
                _this.showErrorValidation = true;
            else
                _this.showError = true;
            _this.showSpinner = false;
        });
    };
    LoginFormComponent.prototype.forgotPasswordClick = function () {
        this.showForgotPassword = true;
    };
    LoginFormComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.login(this.loginForm.value);
        }
    };
    LoginFormComponent.prototype.clickForgotPassword = function () {
        this.showForgotPassword = true;
    };
    LoginFormComponent.prototype.cancelForgotPassword = function () {
        this.showForgotPassword = false;
    };
    LoginFormComponent.prototype.forgotPassword = function (formValues) {
        var _this = this;
        this.showSpinnerForgotPassword = true;
        this.authService.sendForgotPasswordEmail(formValues.email).subscribe(function (response) {
            _this.showForgotPasswordEmailSent = true;
            _this.showSpinnerForgotPassword = false;
        }, function (error) {
            _this.showForgotPasswordError = true;
            _this.showSpinnerForgotPassword = false;
        });
    };
    LoginFormComponent.prototype.resendWelcomeEmail = function (formValues) {
        var _this = this;
        this.authService.sendWelcomeEmail(formValues.login).subscribe(function (response) {
            _this.showErrorValidation = false;
        }, function (error) {
            _this.router.navigate(['/error']);
        });
    };
    LoginFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-form',
            templateUrl: 'login-form.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, core_2.TranslateService])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
exports.LoginFormComponent = LoginFormComponent;
//# sourceMappingURL=login-form.component.js.map