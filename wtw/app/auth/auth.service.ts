import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    currentUser: any
    loginUser(login: string, password: string) {
        this.currentUser = {
            firstName: 'Flo',
            lastName: 'Test'
        };
    }

    getCurrentUser() {
        return this.currentUser;
    }
}