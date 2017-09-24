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

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}