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
var countries_service_1 = require("../countries/countries.service");
var core_2 = require("@ngx-translate/core");
var router_1 = require("@angular/router");
var UserProfilePageComponent = (function () {
    function UserProfilePageComponent(authService, router, userService, countriesService, translate) {
        this.authService = authService;
        this.router = router;
        this.userService = userService;
        this.countriesService = countriesService;
        this.translate = translate;
    }
    UserProfilePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        var currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.user = currentUser;
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
            this.translate.get('USER_PROFILE.DELETE_CONFIRM').subscribe(function (res) {
                _this.labelDeleteConfirm = res;
            });
            this.countriesService.getAll().subscribe(function (response) {
                _this.countriesList = response.json().countries;
                _this.profileForm = {
                    firstName: _this.user.firstName,
                    lastName: _this.user.lastName,
                    yearOfBirth: _this.user.yearOfBirth,
                    selectedCountry: _this.user.country
                };
                _this.updatePhoto();
            }, function (error) {
                throw new Error(error);
            });
        }
        else {
            this.router.navigate(['']);
        }
    };
    UserProfilePageComponent.prototype.updatePhoto = function () {
        var _this = this;
        this.isLoading = true;
        this.userService.getAvatar(this.user.id, 'big').subscribe(function (res) {
            var data = res.json();
            if (data && data.success) {
                _this.photoData = data.data;
            }
            else
                _this.photoData = null;
            _this.isLoading = false;
        }, function (error) {
            throw new Error(error);
        });
    };
    UserProfilePageComponent.prototype.upload = function () {
        var _this = this;
        this.isLoading = true;
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            var formData = new FormData();
            formData.append("image", fileBrowser.files[0]);
            this.userService.uploadAvatar(formData).subscribe(function (res) {
                setTimeout(function () {
                    _this.updatePhoto();
                }, 10000);
            }, function (error) {
                throw new Error(error);
            });
        }
    };
    UserProfilePageComponent.prototype.delete = function () {
        var _this = this;
        if (confirm(this.labelDeleteConfirm)) {
            this.userService.deleteAvatar().subscribe(function (res) {
                _this.updatePhoto();
            }, function (error) {
                throw new Error(error);
            });
        }
    };
    UserProfilePageComponent.prototype.save = function () {
        var _this = this;
        this.isLoading = true;
        this.authService.setUserProperties(this.profileForm).subscribe(function (res) {
            _this.isLoading = false;
        }, function (error) {
            throw new Error(error);
        });
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
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router, user_service_1.UserService, countries_service_1.CountriesService, core_2.TranslateService])
    ], UserProfilePageComponent);
    return UserProfilePageComponent;
}());
exports.UserProfilePageComponent = UserProfilePageComponent;
//# sourceMappingURL=user-profile-page.component.js.map