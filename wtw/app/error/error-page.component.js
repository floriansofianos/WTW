"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ErrorPageComponent = (function () {
    function ErrorPageComponent() {
    }
    ErrorPageComponent = __decorate([
        core_1.Component({
            template: "\n<div class=\"error-container\">\n    <div class=\"error-content\">\n        <i class=\"fa fa-chain-broken\"></i>\n        <div class=\"error\">{{'ERROR.TEXT' | translate}}</div>\n    </div>\n</div>\n"
        })
    ], ErrorPageComponent);
    return ErrorPageComponent;
}());
exports.ErrorPageComponent = ErrorPageComponent;
//# sourceMappingURL=error-page.component.js.map