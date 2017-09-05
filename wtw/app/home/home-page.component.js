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
var auth_service_1 = require("../auth/auth.service");
var HomePageComponent = (function () {
    function HomePageComponent(authService) {
        this.authService = authService;
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser)
            this.name = currentUser.firstName + ' ' + currentUser.lastName;
    };
    HomePageComponent = __decorate([
        core_1.Component({
            template: "\n<top-menu></top-menu>\n<h2>{{ 'HOME.TITLE' | translate }}</h2>\n<div *ngIf=\"name\">\n{{ 'HOME.WELCOME' | translate }} {{ name }}\n</div>\n"
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
