import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'top-menu',
    templateUrl: 'top-menu.component.html'
})

export class TopMenuComponent {
    showMenus: boolean = false;
}