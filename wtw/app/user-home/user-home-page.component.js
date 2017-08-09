var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var UserHomePageComponent = (function () {
    function UserHomePageComponent(authService) {
        this.authService = authService;
    }
    UserHomePageComponent.prototype.ngOnInit = function () {
        var currentUser = this.authService.getCurrentUser();
        if (currentUser)
            this.username = currentUser.username;
    };
    UserHomePageComponent = __decorate([
        core_1.Component({
            template: "\n<h2>{{ 'HOME.WELCOME' | translate }} {{ name }}</h2>\n<first-questionnaire></first-questionnaire>\n"
        })
    ], UserHomePageComponent);
    return UserHomePageComponent;
})();
exports.UserHomePageComponent = UserHomePageComponent;
//# sourceMappingURL=user-home-page.component.js.map