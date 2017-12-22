import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SocialService } from '../social/social.service';
import { NotificationService } from './notification.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'top-menu-notifications',
    templateUrl: 'top-menu-notifications.component.html'
})

export class TopMenuNotificationsComponent {
    @Input() notifications: Array<any>;
    @Input() notificationsLoaded: boolean;
    @Output() notify: EventEmitter<any> = new EventEmitter<any>();
    isLoading: boolean;

    constructor(private router: Router, private translate: TranslateService, private socialService: SocialService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.updateNotifications();
    }

    updateNotifications() {
        this.isLoading = true;
        this.notificationService.get().subscribe(response => {
            let allNotifications = response.json();
            // Show the non-read ones first
            let unreadNotifications = _.filter(allNotifications, (n) => { return !n.read });
            this.notifications = unreadNotifications;
            this.notifications = this.notifications.concat(_.filter(allNotifications, (n) => { return n.read }));
            this.notify.emit({
                newNotifications: _.size(unreadNotifications)
            });
            this.isLoading = false;
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    acceptFriend(userId: number, notificationId: number) {
        this.isLoading = true;
        this.socialService.acceptFriend(userId, notificationId).subscribe(data => {
            if (data) {
                this.updateNotifications();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    refuseFriend(userId: number, notificationId: number) {
        this.isLoading = true;
        this.socialService.refuseFriend(userId, notificationId).subscribe(data => {
            if (data) {
                this.updateNotifications();
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    getMonth(createdAt) {
        return (new Date(createdAt)).getMonth();
    }

}