import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    moduleId: module.id,
    selector: 'movie-wall-element',
    templateUrl: 'movie-wall-element.component.html',
    animations: [
        trigger('posterState', [
            state('normal', style({
                transform: 'scale(1)',
                opacity: 1
            })),
            state('over', style({
                transform: 'scale(1.1)',
                opacity: 0.2
            })),
            transition('* => *', animate('100ms ease-in'))
        ]),
        trigger('titleState', [
            state('normal', style({
                opacity: 0
            })),
            state('over', style({
                opacity: 1
            })),
            transition('* => *', animate('100ms ease-in'))
        ])
    ]
})

export class MovieWallElementComponent {
    @Input() movie: Array<number>;
    @Input() config: any;
    state: string = 'normal';

    onMouseOver() {
        this.state = 'over';
    }

    onMouseOut() {
        this.state = 'normal';
    }

    onMouseUp() {
        this.state = 'over'
    }
}