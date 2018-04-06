import { Component, Input } from '@angular/core';
import { NotificationService } from '../notification/notification.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html'
})

export class TopMenuComponent {
    @Input() showButtons: boolean;
    @Input() showLogin: boolean;
    @Input() selected: string;
    @Input() username: string;
    notificationCount: number;

    constructor(private router: Router, private notificationService: NotificationService) { }

    notificationCountChange(data) {
        this.notificationCount = data.newNotifications;
    }

    readNotifications() {
        this.notificationService.readAllReadOnly().subscribe(response => {
            this.notificationCount -= response.json()[0];
        },
            error => {
                throw new Error(error);
            });
    }
}