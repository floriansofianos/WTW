import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SocialService } from '../social/social.service';

@Component({
    moduleId: module.id,
    selector: 'top-menu-notifications',
    templateUrl: 'top-menu-notifications.component.html'
})

export class TopMenuNotificationsComponent {
    @Input() notifications: Array<any>;
    @Input() notificationsLoaded: boolean;
    isLoading: boolean;

    constructor(private router: Router, private translate: TranslateService, private socialService: SocialService) { }

    ngOnInit() {
        this.isLoading = false;
    }

    acceptFriend(userId: number) {
        this.isLoading = true;
        this.socialService.acceptFriend(userId).subscribe(data => {
            if (data) {
                // TODO Update all notifications
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    refuseFriend(userId: number) {
        this.isLoading = true;
        this.socialService.refuseFriend(userId).subscribe(data => {
            if (data) {
                // TODO Update all notifications
            }
            else this.router.navigate(['error']);
        },
            error => {
                this.router.navigate(['error']);
            });
    }

}