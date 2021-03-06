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
var ng2_validation_1 = require("ng2-validation");
var core_2 = require("@ngx-translate/core");
var SignUpFormComponent = (function () {
    function SignUpFormComponent(router, authService, translate) {
        this.router = router;
        this.authService = authService;
        this.translate = translate;
    }
    SignUpFormComponent.prototype.ngOnInit = function () {
        this.passwordGroup = new forms_1.FormGroup({
            password: new forms_1.FormControl(),
            confirmPassword: new forms_1.FormControl()
        });
        this.signupForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(null, [forms_1.Validators.required, ng2_validation_1.CustomValidators.email]),
            passwordGroup: this.passwordGroup,
            username: new forms_1.FormControl(null, forms_1.Validators.required),
            firstName: new forms_1.FormControl(),
            lastName: new forms_1.FormControl()
        });
    };
    SignUpFormComponent.prototype.cancel = function () {
        this.router.navigate(['']);
    };
    SignUpFormComponent.prototype.signup = function (formValues) {
        var _this = this;
        this.isSubmitted = true;
        if (this.signupForm.valid) {
            this.showSpinner = true;
            formValues.lang = this.translate.currentLang;
            this.authService.signUp(formValues).subscribe(function (response) {
                // We do not want to login the user since he needs to click on the accept link in the email
                //this.authService.setCurrentUser(response.json());
                _this.router.navigate(['']);
            }, function (error) {
                _this.backendError = error;
                _this.showSpinner = false;
            });
        }
    };
    SignUpFormComponent.prototype.isEmailInvalid = function () {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.email && ((this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty) || this.isSubmitted);
    };
    SignUpFormComponent.prototype.isEmailEmpty = function () {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.required && ((this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty) || this.isSubmitted);
    };
    SignUpFormComponent.prototype.isUsernameEmpty = function () {
        return this.signupForm.controls.username.errors && this.signupForm.controls.username.errors.required && ((this.signupForm.controls.username.touched && this.signupForm.controls.username.dirty) || this.isSubmitted);
    };
    SignUpFormComponent.prototype.isPasswordStrongEnough = function () {
        return ((this.passwordGroup.controls.password.touched && this.passwordGroup.controls.password.dirty) || this.isSubmitted) && this.passwordGroup.controls.password.errors != null;
    };
    SignUpFormComponent.prototype.isConfirmPasswordInvalid = function () {
        return ((this.passwordGroup.controls.password.touched && this.passwordGroup.controls.password.dirty && this.passwordGroup.controls.confirmPassword.touched && this.passwordGroup.controls.confirmPassword.dirty) || this.isSubmitted)
            && this.passwordGroup.errors != null;
    };
    SignUpFormComponent.prototype.isEmailTaken = function () {
        return this.signupForm.controls.email.errors && this.signupForm.controls.email.errors.validateEmail && ((this.signupForm.controls.email.touched && this.signupForm.controls.email.dirty) || this.isSubmitted);
    };
    SignUpFormComponent.prototype.isUsernameTaken = function () {
        return this.signupForm.controls.username.errors && this.signupForm.controls.username.errors.validateUsername && ((this.signupForm.controls.username.touched && this.signupForm.controls.username.dirty) || this.isSubmitted);
    };
    SignUpFormComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.signup(this.signupForm.value);
        }
    };
    SignUpFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup-form',
            templateUrl: 'signup-form.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService, core_2.TranslateService])
    ], SignUpFormComponent);
    return SignUpFormComponent;
}());
exports.SignUpFormComponent = SignUpFormComponent;
//# sourceMappingURL=signup-form.component.js.map