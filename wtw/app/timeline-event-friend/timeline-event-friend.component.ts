import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'timeline-event-friend',
    templateUrl: 'timeline-event-friend.component.html'
})

export class TimelineEventFriendComponent {
    friendUsername: string;
    @Input() friendUserId: number;
    @Input() curUserId: number;
    @Input() friends: Array<any>;
    @Input() isCurUserYou: boolean;
    @Input() isFriendUserYou: boolean;
    @Input() curUsername: string;

    ngOnInit() {
        if (!this.isFriendUserYou) {
            var curUserId = this.friendUserId;
            this.friendUsername = _.find(this.friends, function (f) { return f.userId == curUserId }).username;
        }
    }
}