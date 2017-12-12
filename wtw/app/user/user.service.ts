import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class UserService {

    constructor(private http: Http) { }

    uploadAvatar(formData: any): Observable<any> {
        return this.http.post('/api/user/avatar', formData)
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}