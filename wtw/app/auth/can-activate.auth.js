var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CanActivateAuthGuard = (function () {
    function CanActivateAuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    CanActivateAuthGuard.prototype.canActivate = function () {
        if (this.authService.isLoggedIn())
            return true;
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    CanActivateAuthGuard = __decorate([
        core_1.Injectable()
    ], CanActivateAuthGuard);
    return CanActivateAuthGuard;
})();
exports.CanActivateAuthGuard = CanActivateAuthGuard;
//# sourceMappingURL=can-activate.auth.js.map