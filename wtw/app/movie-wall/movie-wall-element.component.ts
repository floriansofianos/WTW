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
    @Input() width: number;
    state: string = 'normal';
    height: number;
    fontSize: number;
    marginTop: number;

    ngOnInit() {
        this.height = Math.floor(this.width * 1.5);
        this.fontSize = this.width < 100 ? 30 : (this.width < 200 ? 40 : (this.width < 300 ? 60 : 70));
        this.marginTop = Math.floor(this.height / 2) - Math.floor(this.fontSize / 2);
    }

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