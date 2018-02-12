import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    template: ''
})
export class DummyUserTVQuestionnairesComponent {
    constructor(private router: Router) { }
    ngOnInit() {
        this.router.navigate(['/user/tvshows/questionnaires']);
    }
}