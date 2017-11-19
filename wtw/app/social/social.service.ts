import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class SocialService {

    constructor(private http: Http) { }

    search(search: string): Observable<any> {
        return this.http.get('/api/user', { params: { search: search } })
            .catch(this.handleErrors);
    }

    getUserProfile(id: number): Observable<any> {
        return this.http.get('/api/user/' + id)
            .catch(this.handleErrors);
    }

    addToFriend(id: number): Observable<any> {
        return this.http.post('/api/friend', { userId: id })
            .catch(this.handleErrors);
    }

    removeFromFriend(id: number): Observable<any> {
        return this.http.delete('/api/friend/' + id)
            .catch(this.handleErrors);
    }

    followUser(id: number): Observable<any> {
        return this.http.post('/api/follow', { userId: id })
            .catch(this.handleErrors);
    }

    unfollowUser(id: number): Observable<any> {
        return this.http.delete('/api/follow/' + id)
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}