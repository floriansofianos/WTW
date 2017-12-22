import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TimelineService {

    constructor(private http: Http) { }

    get(page: number): Observable<any> {
        return this.http.get('/api/timeline', { params: { page: page } })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}