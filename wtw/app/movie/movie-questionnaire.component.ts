import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'movie-questionnaire',
    templateUrl: 'movie-questionnaire.component.html'
})

export class MovieQuestionnaireComponent {
    @Input() movie: any
    @Input() config: any;
}