var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.loginUser = function (login, password) {
        return this.http.post('/auth/signin', { email: login, password: password })
            .catch(this.handleErrors);
    };
    AuthService.prototype.signUp = function (newUserForm) {
        newUserForm.password = newUserForm.passwordGroup.password;
        return this.http.post('/auth/signup', newUserForm)
            .catch(this.handleSignUpErrors);
    };
    AuthService.prototype.verifyEmail = function (email) {
        return this.http.get('/auth/checkEmail?email=' + email)
            .catch(this.handleErrors);
    };
    AuthService.prototype.verifyUsername = function (username) {
        return this.http.get('/auth/checkUsername?username=' + username)
            .catch(this.handleErrors);
    };
    AuthService.prototype.getCurrentUser = function () {
        return this.currentUser;
    };
    AuthService.prototype.setCurrentUser = function (user) {
        this.currentUser = user;
    };
    AuthService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    AuthService.prototype.handleSignUpErrors = function (error) {
        return Rx_1.Observable.throw(error.text());
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map