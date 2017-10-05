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

    getMovie(id: number, lang: string) {
        return this.http.get('/api/movie', { params: { id: id, lang: lang} })
            .catch(this.handleErrors);
    }

    getMovies(movieIds: Array<number>, lang: string) {
        return this.http.get('/api/movie', { params: { movieIds: movieIds, lang: lang } })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}