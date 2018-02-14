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
var _ = require("underscore");
var TimelineEventFollowComponent = (function () {
    function TimelineEventFollowComponent() {
    }
    TimelineEventFollowComponent.prototype.ngOnInit = function () {
        if (!this.isFriendUserYou) {
            var curUserId = this.friendUserId;
            this.friendUsername = _.find(this.friends, function (f) { return f.userId == curUserId; }).username;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimelineEventFollowComponent.prototype, "friendUserId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimelineEventFollowComponent.prototype, "curUserId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TimelineEventFollowComponent.prototype, "friends", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TimelineEventFollowComponent.prototype, "isCurUserYou", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TimelineEventFollowComponent.prototype, "isFriendUserYou", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimelineEventFollowComponent.prototype, "curUsername", void 0);
    TimelineEventFollowComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'timeline-event-follow',
            templateUrl: 'timeline-event-follow.component.html'
        })
    ], TimelineEventFollowComponent);
    return TimelineEventFollowComponent;
}());
exports.TimelineEventFollowComponent = TimelineEventFollowComponent;
//# sourceMappingURL=timeline-event-follow.component.js.map