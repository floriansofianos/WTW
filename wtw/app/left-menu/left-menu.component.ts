import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'left-menu',
    templateUrl: 'left-menu.component.html'
})

export class LeftMenuComponent {
    @Input() leftMenus: Array<any>;
    @Input() rootPath: string;

    constructor(private router: Router) { }

    itemClick(menu: any) {
        this.router.navigate([this.rootPath + menu.path]);
    }
}