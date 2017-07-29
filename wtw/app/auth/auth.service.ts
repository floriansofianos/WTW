import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    currentUser: any
    loginUser(login: string, password: string): Observable<any> {
        return this.http.post('/auth/signin', { email: login, password: password })
            .catch(this.handleErrors);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setCurrentUser(user: any) {
        this.currentUser = user;
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}