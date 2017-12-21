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
var notification_service_1 = require("../notification/notification.service");
var router_1 = require("@angular/router");
var TopMenuComponent = (function () {
    function TopMenuComponent(router, notificationService) {
        this.router = router;
        this.notificationService = notificationService;
    }
    TopMenuComponent.prototype.notificationCountChange = function (data) {
        this.notificationCount = data.newNotifications;
    };
    TopMenuComponent.prototype.readNotifications = function () {
        var _this = this;
        this.notificationService.readAllReadOnly().subscribe(function (response) {
            _this.notificationCount -= response.json()[0];
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TopMenuComponent.prototype, "showButtons", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TopMenuComponent.prototype, "showLogin", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TopMenuComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TopMenuComponent.prototype, "username", void 0);
    TopMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'top-menu',
            templateUrl: 'top-menu.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, notification_service_1.NotificationService])
    ], TopMenuComponent);
    return TopMenuComponent;
}());
exports.TopMenuComponent = TopMenuComponent;
//# sourceMappingURL=top-menu.component.js.map