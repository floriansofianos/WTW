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
var timeline_service_1 = require("./timeline.service");
var TimelineComponent = /** @class */ (function () {
    function TimelineComponent(router, timelineService) {
        this.router = router;
        this.timelineService = timelineService;
    }
    TimelineComponent.prototype.ngOnInit = function () {
        this.page = 0;
        this.isAllLoaded = false;
    };
    TimelineComponent.prototype.loadEvents = function () {
        var _this = this;
        if (!this.isAllLoaded) {
            this.isLoading = true;
            this.page++;
            this.timelineService.get(this.page).subscribe(function (response) {
                var newEvents = response.json();
                if (newEvents.length < 20) {
                    _this.isAllLoaded = true;
                }
                _this.timelineEvents = _this.timelineEvents.concat(newEvents);
                _this.isLoading = false;
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }
    };
    TimelineComponent.prototype.getMonth = function (createdAt) {
        return (new Date(createdAt)).getMonth();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TimelineComponent.prototype, "timelineEvents", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TimelineComponent.prototype, "friends", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TimelineComponent.prototype, "currentUserId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TimelineComponent.prototype, "lang", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TimelineComponent.prototype, "config", void 0);
    TimelineComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'timeline',
            templateUrl: 'timeline.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, timeline_service_1.TimelineService])
    ], TimelineComponent);
    return TimelineComponent;
}());
exports.TimelineComponent = TimelineComponent;
