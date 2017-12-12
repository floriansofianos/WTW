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
var user_service_1 = require("../user/user.service");
var router_1 = require("@angular/router");
var UserProfilePageComponent = /** @class */ (function () {
    function UserProfilePageComponent(authService, router, userService) {
        this.authService = authService;
        this.router = router;
        this.userService = userService;
    }
    UserProfilePageComponent.prototype.ngOnInit = function () {
        this.isLoading = true;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.user = currentUser;
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
    };
    UserProfilePageComponent.prototype.upload = function () {
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append("image", fileBrowser.files[0]);
            this.userService.uploadAvatar(formData).subscribe(function (res) {
                // do stuff w/my uploaded file
                console.log('It works!!!');
            });
        }
    };
    __decorate([
        core_1.ViewChild('fileInput'),
        __metadata("design:type", Object)
    ], UserProfilePageComponent.prototype, "fileInput", void 0);
    UserProfilePageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'user-profile-page.component.html'
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, user_service_1.UserService])
    ], UserProfilePageComponent);
    return UserProfilePageComponent;
}());
exports.UserProfilePageComponent = UserProfilePageComponent;
