import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class LanguagesService {

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get('/api/languages')
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}