import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UserQuestionnaireService {

    constructor(private http: Http) { }

    get(lang: string): Observable<any> {
        return this.http.get('/api/userQuestionnaire?lang=' + lang)
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}