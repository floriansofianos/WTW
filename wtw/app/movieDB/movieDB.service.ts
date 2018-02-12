import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class MovieDBService {

    constructor(private http: Http) { }

    getMovieDBConfiguration(): Observable<any> {
        return this.http.get('/api/movieDBConfiguration')
            .catch(this.handleErrors);
    }

    search(s: string) {
        return this.http.get('/api/movieDBSearch', { params: { search: s } })
            .catch(this.handleErrors);
    }

    searchTV(s: string) {
        return this.http.get('/api/movieDBSearchTV', { params: { search: s } })
            .catch(this.handleErrors);
    }

    wtw(lang: string, genreId: number, useWatchlist: boolean, useRuntimeLimit: boolean, runtimeLimit: number, minRelease: number, maxRelease: number, nowPlaying: boolean, languageSelected: boolean, friendId: number, usePlex: boolean) {
        return this.http.get('/api/movieDBSearch/wtw', { params: { lang: lang, genreId: genreId, useWatchlist: useWatchlist, useRuntimeLimit: useRuntimeLimit, runtimeLimit: runtimeLimit, minRelease: minRelease, maxRelease: maxRelease, nowPlaying: nowPlaying, languageSelected: languageSelected, friendId: friendId, usePlex: usePlex } })
            .catch(this.handleErrors);
    }

    getMovie(id: number, lang: string) {
        return this.http.get('/api/movie', { params: { id: id, lang: lang} })
            .catch(this.handleErrors);
    }

    getTV(id: number, lang: string) {
        return this.http.get('/api/tvshow', { params: { id: id, lang: lang} })
            .catch(this.handleErrors);
    }

    getMovies(movieIds: Array<number>, lang: string) {
        return this.http.get('/api/movie', { params: { movieIds: movieIds, lang: lang } })
            .catch(this.handleErrors);
    }

    getTVShows(movieIds: Array<number>, lang: string) {
        return this.http.get('/api/tvshow', { params: { movieIds: movieIds, lang: lang } })
            .catch(this.handleErrors);
    }

    availableOnPlex(id: number) {
        return this.http.get('/api/movie/plex', { params: { id: id } })
            .catch(this.handleErrors);
    }

    tvAvailableOnPlex(id: number) {
        return this.http.get('/api/tvshow/plex', { params: { id: id } })
            .catch(this.handleErrors);
    }

    getAllGenres() {
        return this.http.get('/api/movieDBGenres')
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}