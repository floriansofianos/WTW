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
var social_service_1 = require("../social/social.service");
var router_2 = require("@angular/router");
var UserPageComponent = /** @class */ (function () {
    function UserPageComponent(authService, router, socialService, route) {
        this.authService = authService;
        this.router = router;
        this.socialService = socialService;
        this.route = route;
    }
    UserPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
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
        // Load the asked user profile
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            _this.socialService.getUserProfile(_this.id).subscribe(function (data) {
                if (data) {
                    _this.user = data.json();
                    _this.updateFriendStatus();
                }
                else
                    _this.router.navigate(['error']);
            }, function (error) {
                _this.router.navigate(['error']);
            });
            _this.socialService.getUserDistance(_this.id).subscribe(function (data) {
                if (data) {
                    _this.updateDistance(data.json());
                }
                else
                    _this.router.navigate(['error']);
            }, function (error) {
                _this.router.navigate(['error']);
            });
        });
    };
    UserPageComponent.prototype.updateDistance = function (distance) {
        this.averageDistance = 100 - distance.averageDistance;
    };
    UserPageComponent.prototype.updateFriendStatus = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.getPendingFriend(this.id).subscribe(function (data) {
            if (data) {
                if (data.json().length > 0) {
                    _this.isPendingFriend = true;
                    _this.friendship = null;
                    _this.isFriend = false;
                    _this.isLoading = false;
                }
                else {
                    _this.socialService.getFriend(_this.id).subscribe(function (data) {
                        if (data) {
                            _this.friendship = data.json();
                            _this.isFriend = _this.friendship != undefined;
                            _this.isPendingFriend = false;
                            _this.isLoading = false;
                        }
                        else
                            _this.router.navigate(['error']);
                    }, function (error) {
                        _this.router.navigate(['error']);
                    });
                }
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserPageComponent.prototype.requestFriend = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.addToFriend(this.id).subscribe(function (data) {
            if (data) {
                _this.updateFriendStatus();
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserPageComponent.prototype.follow = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.followUser(this.id).subscribe(function (data) {
            if (data) {
                _this.updateFriendStatus();
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserPageComponent.prototype.unfollow = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.unfollowUser(this.id).subscribe(function (data) {
            if (data) {
                _this.updateFriendStatus();
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserPageComponent.prototype.unfriend = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.removeFromFriend(this.id).subscribe(function (data) {
            if (data) {
                _this.updateFriendStatus();
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserPageComponent.prototype.acceptFriendship = function () {
        var _this = this;
        this.isLoading = true;
        this.socialService.acceptFriend(this.id).subscribe(function (data) {
            if (data) {
                _this.updateFriendStatus();
            }
            else
                _this.router.navigate(['error']);
        }, function (error) {
            _this.router.navigate(['error']);
        });
    };
    UserPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    UserPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, social_service_1.SocialService, router_2.ActivatedRoute])
    ], UserPageComponent);
    return UserPageComponent;
}());
exports.UserPageComponent = UserPageComponent;
