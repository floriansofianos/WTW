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
var UsernameValidator = UsernameValidator_1 = (function () {
    function UsernameValidator(authService) {
        this.authService = authService;
    }
    UsernameValidator.prototype.validate = function (formControl) {
        var _this = this;
        return new Promise(function (resolve) {
            if (formControl && formControl.value) {
                _this.authService.verifyUsername(formControl.value).subscribe(function (response) {
                    if (!response.json().isTaken)
                        return resolve(null);
                    else
                        return resolve({ validateUsername: true });
                }, function (error) {
                    return resolve({ validateUsername: true });
                });
            }
            else {
                return resolve({ validateUsername: true });
            }
        });
    };
    return UsernameValidator;
}());
UsernameValidator = UsernameValidator_1 = __decorate([
    core_1.Directive({
        selector: '[validateUsername]',
        providers: [{ provide: forms_1.NG_ASYNC_VALIDATORS, useExisting: UsernameValidator_1, multi: true }]
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UsernameValidator);
exports.UsernameValidator = UsernameValidator;
var UsernameValidator_1;