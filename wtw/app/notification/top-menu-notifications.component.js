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
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var social_service_1 = require("../social/social.service");
var TopMenuNotificationsComponent = /** @class */ (function () {
    function TopMenuNotificationsComponent(router, translate, socialService) {
        this.router = router;
        this.translate = translate;
        this.socialService = socialService;
    }
    TopMenuNotificationsComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
    };
    TopMenuNotificationsComponent.prototype.acceptFriend = function (userId) {
        var _this = this;
        this.isLoading = true;
        this.socialService.acceptFriend(userId).subscribe(function (data) {
            if (data) {
                // TODO Update all notifications
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    TopMenuNotificationsComponent.prototype.refuseFriend = function (userId) {
        var _this = this;
        this.isLoading = true;
        this.socialService.refuseFriend(userId).subscribe(function (data) {
            if (data) {
                // TODO Update all notifications
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TopMenuNotificationsComponent.prototype, "notifications", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TopMenuNotificationsComponent.prototype, "notificationsLoaded", void 0);
    TopMenuNotificationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'top-menu-notifications',
            templateUrl: 'top-menu-notifications.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, core_2.TranslateService, social_service_1.SocialService])
    ], TopMenuNotificationsComponent);
    return TopMenuNotificationsComponent;
}());
exports.TopMenuNotificationsComponent = TopMenuNotificationsComponent;
