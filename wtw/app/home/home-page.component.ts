import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    template: `
<top-menu [showButtons]="false" [showLogin]="true" [username]="username"></top-menu>
<h2>{{ 'HOME.TITLE' | translate }}</h2>
<div *ngIf="name">
{{ 'HOME.WELCOME' | translate }} {{ name }}
</div>
<footer></footer>
`
})

export class HomePageComponent {
    name: string;
    username: string;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            this.router.navigate(['/user/home']);
        }
        else this.router.navigate(['/login']);
    }
}