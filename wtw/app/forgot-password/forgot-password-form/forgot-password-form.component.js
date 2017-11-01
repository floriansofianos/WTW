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
var ForgotPasswordFormComponent = (function () {
    function ForgotPasswordFormComponent(activatedRoute, router, authService, translate) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.authService = authService;
        this.translate = translate;
    }
    ForgotPasswordFormComponent.prototype.ngOnInit = function () {
        var password = new forms_1.FormControl();
        var confirmPassword = new forms_1.FormControl();
        this.forgotPasswordForm = new forms_1.FormGroup({
            password: password,
            confirmPassword: confirmPassword
        });
    };
    ForgotPasswordFormComponent.prototype.confirmPassword = function (formValues) {
        var _this = this;
        this.isSubmitted = true;
        if (this.forgotPasswordForm.valid) {
            this.showSpinner = true;
            this.authService.changePassword(this.activatedRoute.snapshot.queryParams['token'], formValues.password).subscribe(function (response) {
                _this.router.navigate(['/login']);
            }, function (error) {
                _this.showError = true;
                _this.showSpinner = false;
            });
        }
    };
    ForgotPasswordFormComponent.prototype.isPasswordStrongEnough = function () {
        return ((this.forgotPasswordForm.controls.password.touched && this.forgotPasswordForm.controls.password.dirty) || this.isSubmitted) && this.forgotPasswordForm.controls.password.errors != null;
    };
    ForgotPasswordFormComponent.prototype.isConfirmPasswordInvalid = function () {
        return ((this.forgotPasswordForm.controls.password.touched && this.forgotPasswordForm.controls.password.dirty && this.forgotPasswordForm.controls.confirmPassword.touched && this.forgotPasswordForm.controls.confirmPassword.dirty) || this.isSubmitted)
            && this.forgotPasswordForm.errors != null;
    };
    ForgotPasswordFormComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.confirmPassword(this.forgotPasswordForm.value);
        }
    };
    ForgotPasswordFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'forgot-password-form',
            templateUrl: 'forgot-password-form.component.html'
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, auth_service_1.AuthService, core_2.TranslateService])
    ], ForgotPasswordFormComponent);
    return ForgotPasswordFormComponent;
}());
exports.ForgotPasswordFormComponent = ForgotPasswordFormComponent;
//# sourceMappingURL=forgot-password-form.component.js.map