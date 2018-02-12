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

    getCast(directorId: number, writerId: number, actorId: number, creatorId: number, lang: string): Observable<any> {
        var params: any = {};
        if (directorId) params.directorId = directorId;
        if (writerId) params.writerId = writerId;
        if (actorId) params.actorId = actorId;
        if (creatorId) params.creatorId = creatorId;
        params.lang = lang;
        return this.http.get('/api/cast', { params: params })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}