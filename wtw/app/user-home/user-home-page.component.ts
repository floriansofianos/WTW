﻿import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';

@Component({
    moduleId: module.id,
    templateUrl: 'user-home-page.component.html'
})

export class UserHomePageComponent {
    username: string;
    notifications: Array<any>;
    notificationsLoaded: boolean;

    constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

    ngOnInit() {
        let currentUser = this.authService.getCurrentUser();
        if (currentUser) {
            if (!currentUser.firstQuestionnaireCompleted) {
                this.router.navigate(['/user/welcome']);
            }
            this.username = currentUser.username;
        }
        else {
            this.router.navigate(['']);
        }
        this.notificationService.get().subscribe(response => {
            this.notifications = response.json();
            this.notificationsLoaded = true;
        },
            error => {
                this.router.navigate(['error']);
            });
    }
}