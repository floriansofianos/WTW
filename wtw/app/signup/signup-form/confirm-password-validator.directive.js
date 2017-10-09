"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ConfirmPasswordValidator = /** @class */ (function () {
    function ConfirmPasswordValidator() {
    }
    ConfirmPasswordValidator_1 = ConfirmPasswordValidator;
    ConfirmPasswordValidator.prototype.validate = function (formGroup) {
        var passwordControl = formGroup.controls['password'];
        var confirmPasswordControl = formGroup.controls['confirmPassword'];
        if ((passwordControl && passwordControl.value)
            && (confirmPasswordControl && confirmPasswordControl.value)
            && confirmPasswordControl.value === passwordControl.value) {
            return null;
        }
        else {
            return { validateConfirmPassword: false };
        }
    };
    ConfirmPasswordValidator = ConfirmPasswordValidator_1 = __decorate([
        core_1.Directive({
            selector: '[validateConfirmPassword]',
            providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: ConfirmPasswordValidator_1, multi: true }]
        })
    ], ConfirmPasswordValidator);
    return ConfirmPasswordValidator;
    var ConfirmPasswordValidator_1;
}());
exports.ConfirmPasswordValidator = ConfirmPasswordValidator;
