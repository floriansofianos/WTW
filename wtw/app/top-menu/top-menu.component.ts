import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html'
})

export class TopMenuComponent {
    @Input() showButtons: boolean;
    @Input() showLogin: boolean;
    @Input() selected: string;
}