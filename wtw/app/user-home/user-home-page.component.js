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
var timeline_service_1 = require("../timeline/timeline.service");
var user_service_1 = require("../user/user.service");
var movieDB_service_1 = require("../movieDB/movieDB.service");
var UserHomePageComponent = (function () {
    function UserHomePageComponent(authService, router, timelineService, userService, movieDBService) {
        this.authService = authService;
        this.router = router;
        this.timelineService = timelineService;
        this.userService = userService;
        this.movieDBService = movieDBService;
    }
    UserHomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
        this.currentUserId = currentUser.id;
        this.lang = currentUser.lang;
        this.userService.hasEnoughProfiles().subscribe(function (response) {
            _this.notEnoughProfiles = !(response.json().enoughProfiles);
        }, function (error) {
            _this.router.navigate(['error']);
        });
        this.movieDBService.getMovieDBConfiguration().subscribe(function (response) {
            _this.config = response.json();
            _this.userService.getAllFriends().subscribe(function (response) {
                _this.allFriends = response.json();
                _this.timelineService.get(0).subscribe(function (response) {
                    _this.timelineEvents = response.json();
                }, function (error) {
                    _this.router.navigate(['error']);
                });
            }, function (error) {
                _this.router.navigate(['error']);
            });
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserHomePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-home-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, timeline_service_1.TimelineService, user_service_1.UserService, movieDB_service_1.MovieDBService])
    ], UserHomePageComponent);
    return UserHomePageComponent;
}());
exports.UserHomePageComponent = UserHomePageComponent;
//# sourceMappingURL=user-home-page.component.js.map