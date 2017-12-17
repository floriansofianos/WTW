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
var MovieDBService = (function () {
    function MovieDBService(http) {
        this.http = http;
    }
    MovieDBService.prototype.getMovieDBConfiguration = function () {
        return this.http.get('/api/movieDBConfiguration')
            .catch(this.handleErrors);
    };
    MovieDBService.prototype.search = function (s) {
        return this.http.get('/api/movieDBSearch', { params: { search: s } })
            .catch(this.handleErrors);
    };
    MovieDBService.prototype.wtw = function (lang, genreId, useWatchlist, useRuntimeLimit, runtimeLimit, minRelease, maxRelease, nowPlaying, languageSelected, friendId) {
        return this.http.get('/api/movieDBSearch/wtw', { params: { lang: lang, genreId: genreId, useWatchlist: useWatchlist, useRuntimeLimit: useRuntimeLimit, runtimeLimit: runtimeLimit, minRelease: minRelease, maxRelease: maxRelease, nowPlaying: nowPlaying, languageSelected: languageSelected, friendId: friendId } })
            .catch(this.handleErrors);
    };
    MovieDBService.prototype.getMovie = function (id, lang) {
        return this.http.get('/api/movie', { params: { id: id, lang: lang } })
            .catch(this.handleErrors);
    };
    MovieDBService.prototype.getMovies = function (movieIds, lang) {
        return this.http.get('/api/movie', { params: { movieIds: movieIds, lang: lang } })
            .catch(this.handleErrors);
    };
    MovieDBService.prototype.getAllGenres = function () {
        return this.http.get('/api/movieDBGenres')
            .catch(this.handleErrors);
    };
    MovieDBService.prototype.handleErrors = function (error) {
        return Rx_1.Observable.throw(error.status);
    };
    return MovieDBService;
}());
MovieDBService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MovieDBService);
exports.MovieDBService = MovieDBService;
//# sourceMappingURL=movieDB.service.js.map