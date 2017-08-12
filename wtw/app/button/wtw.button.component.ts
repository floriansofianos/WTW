import { Component } from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'wtw-button',
    template: `<a class="button" [@buttonState]="state" (click)="onClick()" (mouseup)="onMouseUp()" 
                (mouseout)="onMouseOut()" (mouseover)="onMouseOver()"><ng-content></ng-content></a>`,
    animations: [
        trigger('buttonState', [
            state('normal', style({
                transform: 'scale(1)'
            })),
            state('over', style({
                transform: 'scale(1.1)'
            })),
            state('click', style({
                transform: 'scale(0.9)'
            })),
            transition('* => *', animate('100ms ease-in'))
        ])
    ]
})

export class WtwButtonComponent {
    state: string = 'normal';

    onClick() {
        this.state = 'click';
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