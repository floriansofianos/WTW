import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class MovieQuestionnaireService {

    constructor(private http: Http) { }

    create(movieQuestionnaire: any): Observable<any> {
        return this.http.post('/api/movieQuestionnaire', movieQuestionnaire)
            .catch(this.handleErrors);
    }

    getAll(): Observable<any> {
        return this.http.get('/api/movieQuestionnaire')
            .catch(this.handleErrors);
    }

    getWatchlist(): Observable<any> {
        return this.http.get('/api/movieQuestionnaire/watchlist')
            .catch(this.handleErrors);
    }

    get(id: number) {
        return this.http.get('/api/movieQuestionnaire/' + id)
            .catch(this.handleErrors);
    }

    getCast(id: number): Observable<any> {
        return this.http.get('/api/cast?id=' + id)
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}