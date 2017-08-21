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

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}