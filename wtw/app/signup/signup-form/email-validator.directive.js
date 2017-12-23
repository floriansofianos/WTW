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
var auth_service_1 = require("../../auth/auth.service");
var EmailValidator = /** @class */ (function () {
    function EmailValidator(authService) {
        this.authService = authService;
    }
    EmailValidator_1 = EmailValidator;
    EmailValidator.prototype.validate = function (formControl) {
        var _this = this;
        return new Promise(function (resolve) {
            if (formControl && formControl.value) {
                _this.authService.verifyEmail(formControl.value).subscribe(function (response) {
                    if (!response.json().isTaken)
                        return resolve(null);
                    else
                        return resolve({ validateEmail: true });
                }, function (error) {
                    return resolve({ validateEmail: true });
                });
            }
            else {
                return resolve({ validateEmail: true });
            }
        });
    };
    EmailValidator = EmailValidator_1 = __decorate([
        core_1.Directive({
            selector: '[validateEmail]',
            providers: [{ provide: forms_1.NG_ASYNC_VALIDATORS, useExisting: EmailValidator_1, multi: true }]
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], EmailValidator);
    return EmailValidator;
    var EmailValidator_1;
}());
exports.EmailValidator = EmailValidator;
