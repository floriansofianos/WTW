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

    getAvatar(userId: number, size: string): Observable<any> {
        return this.http.get('/api/user/avatar/' + userId, { params: { size: size } })
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}