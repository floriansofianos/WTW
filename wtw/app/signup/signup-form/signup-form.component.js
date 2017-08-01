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
var SignupFormComponent = (function () {
    function SignupFormComponent(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    SignupFormComponent.prototype.ngOnInit = function () {
        var login = new forms_1.FormControl();
        var password = new forms_1.FormControl();
        this.signupForm = new forms_1.FormGroup({
            login: login,
            password: password
        });
    };
    SignupFormComponent.prototype.cancel = function () {
        this.router.navigate(['']);
    };
    SignupFormComponent.prototype.signup = function (formValues) {
        this.showSpinner = true;
    };
    return SignupFormComponent;
}());
SignupFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'signup-form',
        templateUrl: 'signup-form.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router, auth_service_1.AuthService])
], SignupFormComponent);
exports.SignupFormComponent = SignupFormComponent;
