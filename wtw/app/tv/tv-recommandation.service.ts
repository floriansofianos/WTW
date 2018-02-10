import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TVRecommandationService {

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get('/api/tvRecommandation')
            .catch(this.handleErrors);
    }

    getScore(id: number): Observable<any> {
        return this.http.get('/api/tvRecommandation/score', { params: { id: id } })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}