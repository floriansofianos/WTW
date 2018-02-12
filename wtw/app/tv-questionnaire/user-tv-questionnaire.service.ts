import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UserTVQuestionnaireService {

    constructor(private http: Http) { }

    get(lang: string): Observable<any> {
        return this.http.get('/api/userTVQuestionnaire?lang=' + lang)
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}