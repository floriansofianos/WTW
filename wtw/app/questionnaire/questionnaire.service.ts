import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class QuestionnaireService {

    constructor(private http: Http) { }

    getFirstQuestionnaireMovie(lang: string): Observable<any> {
        return this.http.get('/api/firstQuestionnaire?lang=' + lang)
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}