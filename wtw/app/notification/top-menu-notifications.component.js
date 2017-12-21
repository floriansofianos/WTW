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
var notification_service_1 = require("./notification.service");
var _ = require("underscore");
var TopMenuNotificationsComponent = (function () {
    function TopMenuNotificationsComponent(router, translate, socialService, notificationService) {
        this.router = router;
        this.translate = translate;
        this.socialService = socialService;
        this.notificationService = notificationService;
        this.notify = new core_1.EventEmitter();
    }
    TopMenuNotificationsComponent.prototype.ngOnInit = function () {
        this.updateNotifications();
    };
    TopMenuNotificationsComponent.prototype.updateNotifications = function () {
        var _this = this;
        this.isLoading = true;
        this.notificationService.get().subscribe(function (response) {
            var allNotifications = response.json();
            // Show the non-read ones first
            var unreadNotifications = _.filter(allNotifications, function (n) { return !n.read; });
            _this.notifications = unreadNotifications;
            _this.notifications = _this.notifications.concat(_.filter(allNotifications, function (n) { return n.read; }));
            _this.notify.emit({
                newNotifications: _.size(unreadNotifications)
            });
            _this.isLoading = false;
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    TopMenuNotificationsComponent.prototype.acceptFriend = function (userId, notificationId) {
        var _this = this;
        this.isLoading = true;
        this.socialService.acceptFriend(userId, notificationId).subscribe(function (data) {
            if (data) {
                _this.updateNotifications();
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    TopMenuNotificationsComponent.prototype.refuseFriend = function (userId, notificationId) {
        var _this = this;
        this.isLoading = true;
        this.socialService.refuseFriend(userId, notificationId).subscribe(function (data) {
            if (data) {
                _this.updateNotifications();
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
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TopMenuNotificationsComponent.prototype, "notify", void 0);
    TopMenuNotificationsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'top-menu-notifications',
            templateUrl: 'top-menu-notifications.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, core_2.TranslateService, social_service_1.SocialService, notification_service_1.NotificationService])
    ], TopMenuNotificationsComponent);
    return TopMenuNotificationsComponent;
}());
exports.TopMenuNotificationsComponent = TopMenuNotificationsComponent;
//# sourceMappingURL=top-menu-notifications.component.js.map