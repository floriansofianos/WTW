import { Component, Input } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service'
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'cast-member',
    templateUrl: 'cast-member.component.html'
})

export class CastMemberComponent {
    @Input() castMember: any;
    @Input() config: any;
    @Input() job: string;

    constructor(private modal: Modal, private movieQuestionnaireService: MovieQuestionnaireService, private router: Router) { }

    isImgProfile(file: string) {
        if (file === null || file === '') return false;
        else return true;
    }

    modalCast() {
        this.movieQuestionnaireService.getCast(this.castMember.id).subscribe(response => {
            let details = response.json();
            this.modal.alert()
            .size('lg')
            .showClose(true)
                .title(this.castMember.name)
            .body(`
            <div class="movie-poster-container"><img width="200" src="` + this.config.images.base_url + this.config.images.poster_sizes[3] + details.cast[0].poster_path  + `" /></div>
            <h4>` + details.cast[0].character + `</h4>
            `)
            .open();
        },
            error => {
                this.router.navigate(['error']);
            });
    }
}