import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class MovieRecommandationService {

    constructor(private http: Http) { }

    getAll(): Observable<any> {
        return this.http.get('/api/movieRecommandation')
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}