import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class CountriesService {

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get('/api/countries')
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}