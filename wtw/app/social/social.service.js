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
var SocialService = (function () {
    function SocialService(http) {
        this.http = http;
    }
    SocialService.prototype.search = function (search) {
        return this.http.get('/api/user', { params: { search: search } })
            .catch(this.handleErrors);
    };
    SocialService.prototype.getUserProfile = function (id) {
        return this.http.get('/api/user/' + id)
            .catch(this.handleErrors);
    };
    SocialService.prototype.addToFriend = function (id) {
        return this.http.post('/api/friend', { userId: id })
            .catch(this.handleErrors);
    };
    SocialService.prototype.removeFromFriend = function (id) {
        return this.http.delete('/api/friend/' + id)
            .catch(this.handleErrors);
    };
    SocialService.prototype.unfollowUser = function (id) {
        return this.http.delete('/api/follow/' + id)
            .catch(this.handleErrors);
    };
    SocialService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    SocialService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SocialService);
    return SocialService;
}());
exports.SocialService = SocialService;
//# sourceMappingURL=social.service.js.map