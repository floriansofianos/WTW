﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({

})
export class DummyUserMoviesQuestionnairesComponent {
    constructor(private router: Router) { }
    ngOnInit() {
        this.router.navigate(['/user/movies/questionnaires'], { skipLocationChange: true });
    }
}