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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.loginUser = function (login, password, rememberMe) {
        return this.http.post('/auth/signin', { email: login, password: password, remember_me: rememberMe })
            .catch(this.handleErrors);
    };
    AuthService.prototype.changePassword = function (token, newPassword) {
        return this.http.get('/auth/newPassword', { params: { token: token, password: newPassword } })
            .catch(this.handleErrors);
    };
    AuthService.prototype.sendForgotPasswordEmail = function (email) {
        return this.http.get('/auth/forgotPassword', { params: { email: email } })
            .catch(this.handleErrors);
    };
    AuthService.prototype.sendWelcomeEmail = function (email) {
        return this.http.get('/auth/sendWelcomeEmail', { params: { email: email } })
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
    AuthService.prototype.setUserProperty = function (prop, value) {
        this.currentUser[prop] = value;
        var requestBody = {};
        requestBody[prop] = value;
        return this.http.put('/auth/current', requestBody)
            .catch(this.handleErrors);
    };
    AuthService.prototype.isLoggedIn = function () {
        return this.currentUser != null;
    };
    AuthService.prototype.verifyCurrentUser = function () {
        return this.http.get('/auth/current')
            .catch(this.handleErrors);
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
    AuthService.prototype.load = function () {
        var _this = this;
        var promise = this.http.get('/auth/current').toPromise();
        promise.then(function (response) {
            if (response._body !== '')
                _this.setCurrentUser(response.json());
        });
        return promise;
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
