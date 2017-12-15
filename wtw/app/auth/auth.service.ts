import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as _ from 'underscore';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    currentUser: any
    loginUser(login: string, password: string, rememberMe: boolean): Observable<any> {
        return this.http.post('/auth/signin', { email: login, password: password, remember_me: rememberMe })
            .catch(this.handleErrors);
    }

    changePassword(token: string, newPassword: string): Observable<any> {
        return this.http.get('/auth/newPassword', { params: { token: token, password: newPassword } })
            .catch(this.handleErrors);
    }

    sendForgotPasswordEmail(email: string): Observable<any> {
        return this.http.get('/auth/forgotPassword', { params: { email: email } })
            .catch(this.handleErrors);
    }

    sendWelcomeEmail(email: string): Observable<any> {
        return this.http.get('/auth/sendWelcomeEmail', { params: { email: email } })
            .catch(this.handleErrors);
    }

    signUp(newUserForm: any): Observable<any> {
        newUserForm.password = newUserForm.passwordGroup.password;
        return this.http.post('/auth/signup', newUserForm)
            .catch(this.handleSignUpErrors);
    }

    verifyEmail(email: string): Observable<any> {
        return this.http.get('/auth/checkEmail?email=' + email)
            .catch(this.handleErrors);
    }

    verifyUsername(username: string): Observable<any> {
        return this.http.get('/auth/checkUsername?username=' + username)
            .catch(this.handleErrors);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    setUserProperty(prop: string, value: any) {
        this.currentUser[prop] = value;
        let requestBody = {}
        requestBody[prop] = value
        return this.http.put('/auth/current', requestBody)
            .catch(this.handleErrors);
    }

    setUserProperties(values: any) {
        let currentUser = this.currentUser;
        _.each(values, function (value, key, obj) { currentUser[key] = value; });
        return this.http.put('/auth/current', values)
            .catch(this.handleErrors);
    }

    isLoggedIn() {
        return this.currentUser != null;
    }

    verifyCurrentUser() {
        return this.http.get('/auth/current')
            .catch(this.handleErrors);
    }

    setCurrentUser(user: any) {
        this.currentUser = user;
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }

    handleSignUpErrors(error: Response) {
        return Observable.throw(error.text());
    }

    load() {
        let promise = this.http.get('/auth/current').toPromise();
        promise.then((response: any) => {
            if (response._body !== '') this.setCurrentUser(response.json());
        });
        return promise;
    }
}