import { Component, Input } from '@angular/core';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'cast-member',
    templateUrl: 'cast-member.component.html'
})

export class CastMemberComponent {
    @Input() castMember: any;
    @Input() config: any;
    @Input() job: string;
    @Input() isCrew: boolean;

    constructor(private modal: Modal, private movieQuestionnaireService: MovieQuestionnaireService, private router: Router, private translate: TranslateService) { }

    isImgProfile(file: string) {
        if (file === null || file === '') return false;
        else return true;
    }

    modalCast() {
        this.movieQuestionnaireService.getCast(this.castMember.id).subscribe(response => {
            let details = response.json();
            let modalTitle = this.isCrew ? this.translate.get('CAST.ALSO_KNOWN') : this.translate.get('CAST.ALSO_SEEN')
            this.modal.alert()
            .size('lg')
            .showClose(true)
            .title(this.castMember.name)
            .body(`
            <div><h4>` + modalTitle + `</h4></div>
            <div class="modal-movies-container">
            ` + this.getAllMoviesHtml(details) + `
            </div>
            `)
            .open();
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    getPosterHtml(movie: any) {
        return `
            <div class="movie-poster-container">
                <img width="200" src="` + this.config.images.base_url + this.config.images.poster_sizes[3] + movie.poster_path + `" />
                <div class="modal-movie-title">` + movie.title + `</div>
                <div class="modal-movie-job">` + (this.isCrew ? this.job : movie.character) + `</div>
            </div>
            `
    }

    getAllMoviesHtml(details: any) {
        let movies = [];
        if (this.isCrew) {
            for (let i = 0; i < Math.min(details.crew.length, 5); i++) {
                movies.push(details.crew[i]);
            }
        }
        else {
            for (let i = 0; i < Math.min(details.cast.length, 5); i++) {
                movies.push(details.cast[i]);
            }
        }
        let result = '';
        for (let i = 0; i < movies.length; i++) {
            result += this.getPosterHtml(movies[i]);
        }
        return result;
    }

}