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
var router_1 = require("@angular/router");
var social_service_1 = require("./social.service");
var SocialPageComponent = (function () {
    function SocialPageComponent(authService, router, socialService) {
        this.authService = authService;
        this.router = router;
        this.socialService = socialService;
    }
    SocialPageComponent.prototype.ngOnInit = function () {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            if (!this.currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = this.currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
    };
    SocialPageComponent.prototype.clickSearch = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.search(this.search).subscribe(function (data) {
            if (data) {
                data = data.json();
                if (data.success != undefined) {
                    _this.isLoading = false;
                    _this.noResults = true;
                }
                else
                    _this.router.navigate(['/user/' + data.id]);
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            throw new Error(error);
        });
    };
    SocialPageComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode == 13) {
            // Enter pressed
            this.clickSearch();
        }
    };
    SocialPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'social-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, social_service_1.SocialService])
    ], SocialPageComponent);
    return SocialPageComponent;
}());
exports.SocialPageComponent = SocialPageComponent;
//# sourceMappingURL=social-page.component.js.map