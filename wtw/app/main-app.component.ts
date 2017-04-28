import { Component } from '@angular/core';

@Component({
    selector: 'main-app',
    template: '<h2>Hello World From Angular 2</h2><div>{{ testVariable }}</div>'
})

export class MainAppComponent {
    testVariable = 'Test Var';
}