import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TVQuestionnaireService {

    constructor(private http: Http) { }

    create(tvQuestionnaire: any): Observable<any> {
        return this.http.post('/api/tvQuestionnaire', tvQuestionnaire)
            .catch(this.handleErrors);
    }

    getAll(): Observable<any> {
        return this.http.get('/api/tvQuestionnaire')
            .catch(this.handleErrors);
    }

    getWatchlist(): Observable<any> {
        return this.http.get('/api/tvQuestionnaire/watchlist')
            .catch(this.handleErrors);
    }

    get(id: number) {
        return this.http.get('/api/tvQuestionnaire/' + id)
            .catch(this.handleErrors);
    }

    getCast(creatorId: number, writerId: number, actorId: number, lang: string): Observable<any> {
        var params: any = {};
        if (creatorId) params.creatorId = creatorId;
        if (writerId) params.writerId = writerId;
        if (actorId) params.actorId = actorId;
        params.lang = lang;
        return this.http.get('/api/cast', { params: params })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}