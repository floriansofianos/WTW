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
var TimelineEventFriendComponent = /** @class */ (function () {
    function TimelineEventFriendComponent() {
    }
    TimelineEventFriendComponent.prototype.ngOnInit = function () {
        if (!this.isFriendUserYou) {
            var curUserId = this.friendUserId;
            this.friendUsername = _.find(this.friends, function (f) { return f.userId == curUserId; }).username;
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimelineEventFriendComponent.prototype, "friendUserId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimelineEventFriendComponent.prototype, "curUserId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TimelineEventFriendComponent.prototype, "friends", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TimelineEventFriendComponent.prototype, "isCurUserYou", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TimelineEventFriendComponent.prototype, "isFriendUserYou", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimelineEventFriendComponent.prototype, "curUsername", void 0);
    TimelineEventFriendComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'timeline-event-friend',
            templateUrl: 'timeline-event-friend.component.html'
        })
    ], TimelineEventFriendComponent);
    return TimelineEventFriendComponent;
}());
exports.TimelineEventFriendComponent = TimelineEventFriendComponent;
