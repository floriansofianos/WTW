import { Component, Input } from '@angular/core';
import { Overlay, DialogRef } from 'ngx-modialog';
import { Modal, OneButtonPresetBuilder, OneButtonPreset } from 'ngx-modialog/plugins/bootstrap';
import { MovieQuestionnaireService } from '../movie/movie-questionnaire.service'
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'cast-member',
    templateUrl: 'cast-member.component.html'
})

export class CastMemberComponent {
    @Input() castMember: any;
    @Input() config: any;
    @Input() job: string;
    @Input() crewType: number;
    @Input() currentMovieId: number;

    constructor(private modal: Modal, private movieQuestionnaireService: MovieQuestionnaireService, private router: Router, private translate: TranslateService) { }

    isImgProfile(file: string) {
        if (file === null || file === '') return false;
        else return true;
    }

    modalCast() {
        let modalWindowConfig = this.modal.alert()
            .size('lg')
            .showClose(true)
            .title(this.castMember.name);
        let modalWindowLoadingPromise =
            modalWindowConfig
            .okBtnClass('hidden')
            .body(`
            <div class="loading-container"><i class="fa fa-circle-o-notch fa-spin"></i></div>`)
                .open();
        this.movieQuestionnaireService.getCast(this.castMember.id).subscribe(response => {
            let details = response.json();
            let modalTitleObservable = this.crewType < 2 ? this.translate.get('CAST.ALSO_KNOWN') : this.translate.get('CAST.ALSO_SEEN');
            let modalTitle = '';
            modalTitleObservable.subscribe(response => {
                modalTitle = response;
            });
            // Close the loading modal window
            modalWindowLoadingPromise.then((response: DialogRef<OneButtonPreset>) => {
                response.close();
            });
            this.getAllMoviesHtml(details).then(response => {
                // Open a new one
                modalWindowConfig
                    .okBtnClass('button')
                    .body(`
             <div><h4>` + modalTitle + `</h4></div>
                        <div class="modal-movies-container">
                        ` + response + `
                        </div>`)
                    .open();
            })
           
        },
            error => {
                this.router.navigate(['error']);
            });
    }

    getPosterHtml(movie: any) {
        return `
            <div class="movie-poster-container">
                <img width="150" src="` + this.config.images.base_url + this.config.images.poster_sizes[3] + movie.poster_path + `" />
                <div class="modal-movie-title">` + movie.title + `</div>
                <div class="modal-movie-job">` + (this.crewType < 2 ? this.job : movie.character) + `</div>
            </div>
            `
    }

    getAllMoviesHtml(details: any) {
        let movies = this.crewType < 2 ? details.crew : details.cast;
        let movieId = this.currentMovieId;
        let moviesFiltered = _.filter(movies, function (m) {
            return m.id !== movieId;
        });
        if (this.crewType === 0) {
            moviesFiltered = _.filter(moviesFiltered, function (m) {
                return m.job === 'Director';
            });
        }
        if (this.crewType === 1) {
            moviesFiltered = _.filter(moviesFiltered, function (m) {
                return m.job === 'Screenplay' || m.job === 'Writer';
            });
        }
        moviesFiltered = _.sortBy(moviesFiltered, 'popularity').reverse();
        let result = '';
        if (moviesFiltered.length < 1) {
            return this.translate.get('CAST.NO_RESULTS').toPromise();
        }
        else {
            for (let i = 0; i < Math.min(moviesFiltered.length, 5); i++) {
                result += this.getPosterHtml(moviesFiltered[i]);
            }
            return Promise.resolve(result);
        }
    }

}