import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';

@Component({
    template: `
<top-menu [showButtons]="false" [showLogin]="true"></top-menu>
<h2>{{ 'HOME.TITLE' | translate }}</h2>
<div *ngIf="name">
{{ 'HOME.WELCOME' | translate }} {{ name }}
</div>
`
})

export class HomePageComponent {
    name: string

    constructor(private authService: AuthService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) this.name = currentUser.firstName + ' ' + currentUser.lastName;
    }
}