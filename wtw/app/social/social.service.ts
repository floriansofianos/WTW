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

    getUserDistance(id: number): Observable<any> {
        return this.http.get('/api/user/distance/' + id)
            .catch(this.handleErrors);
    }

    getUsersThatAlsoLiked(): Observable<any> {
        return this.http.get('/api/user/usersThatLiked')
            .catch(this.handleErrors);
    }

    addToFriend(id: number): Observable<any> {
        return this.http.post('/api/friend/' + id, { })
            .catch(this.handleErrors);
    }

    getFriend(id: number): Observable<any> {
        return this.http.get('/api/friend/' + id)
            .catch(this.handleErrors);
    }

    removeFromFriend(id: number): Observable<any> {
        return this.http.delete('/api/friend/' + id)
            .catch(this.handleErrors);
    }

    followUser(id: number): Observable<any> {
        return this.http.post('/api/follow/' + id, { })
            .catch(this.handleErrors);
    }

    unfollowUser(id: number): Observable<any> {
        return this.http.delete('/api/follow/' + id)
            .catch(this.handleErrors);
    }

    getPendingFriend(id: number): Observable<any> {
        return this.http.get('/api/friend/pending/' + id)
            .catch(this.handleErrors);
    }

    deletePendingFriend(id: number): Observable<any> {
        return this.http.delete('/api/friend/pending/' + id)
            .catch(this.handleErrors);
    }

    acceptFriend(id: number): Observable<any> {
        return this.http.post('/api/friend/accept/' + id, {})
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        return Observable.throw(error.status);
    }
}