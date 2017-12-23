import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TimelineService } from './timeline.service';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'timeline',
    templateUrl: 'timeline.component.html'
})

export class TimelineComponent {
    @Input() timelineEvents: Array<any>;
    @Input() friends: Array<any>;
    isLoading: boolean;
    page: number;
    isAllLoaded: boolean;
    @Input() currentUserId: number;
    @Input() lang: string;
    @Input() config: any;

    constructor(private router: Router, private timelineService: TimelineService) { }

    ngOnInit() {
        this.page = 0;
        this.isAllLoaded = false;
    }

    loadEvents() {
        if (!this.isAllLoaded) {
            this.isLoading = true;
            this.page++;
            this.timelineService.get(this.page).subscribe(response => {
                let newEvents = response.json();
                if (newEvents.length < 20) {
                    this.isAllLoaded = true;
                }
                this.timelineEvents = this.timelineEvents.concat(newEvents);
                this.isLoading = false;
            },
                error => {
                    this.router.navigate(['error']);
                });
        }
        
    }

    getMonth(createdAt) {
        return (new Date(createdAt)).getMonth();
    }
}